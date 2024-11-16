import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

import { IJwtPayload } from "../ts/interfaces/IJwtPayload";
import { ITokenInfo } from "../ts/interfaces/ITokenInfo";
import { RegisterDTO } from "../ts/dtos/RegisterDTO";
import { LoginDTO } from "../ts/dtos/LoginDTO";
import { Token } from "../ts/types/Token";
import { AppError } from "../errors/AppError";
import { UserService } from "./user.service";
import { transporter } from "../utils/transporter";
import { resetPasswordMail } from "../utils/helpers/resetPasswordMail";
import { verificationMail } from "./../utils/helpers/verificationMail";

import { inject, injectable } from "inversify";
import { TYPES } from "../config/types.config";
import { ResetPasswordDTO } from "../ts/dtos/ResetPasswordDTO";

@injectable()
export class AuthService {
	constructor(@inject(TYPES.UserService) private userService: UserService) {}

	async register(dto: RegisterDTO): Promise<{ message: string }> {
		const { usr_name, usr_email, usr_password } = dto;

		const checkEmail = await this.userService.findByEmail(usr_email);

		if (checkEmail) {
			throw new AppError(
				"An account with this email already exists",
				409
			);
		}

		const hashedPassword = await bcrypt.hash(usr_password, 10);

		const user = await this.userService.createUser({
			usr_name,
			usr_email,
			usr_password: hashedPassword,
		});

		const token = this.generateToken("verification_token", {
			usr_id: user.usr_id,
			usr_name: user.usr_name,
		});

		await transporter.sendMail(
			verificationMail({
				to: usr_email,
				subject: "Verify Your Email",
				token,
			})
		);

		return {
			message:
				"Registration successful. Check your email to verify your account.",
		};
	}

	async login(
		dto: LoginDTO
	): Promise<{ accessToken: string; refreshToken: string }> {
		const { usr_email, usr_password } = dto;
		const user = await this.userService.findByEmail(usr_email);

		if (!user) {
			throw new AppError("The email was not found", 404);
		}

		if (!user.usr_verified) {
			throw new AppError("Please verify your email", 401);
		}

		const checkPassword = await bcrypt.compare(
			usr_password,
			user.passwordValue
		);

		if (!checkPassword) {
			throw new AppError("Invalid credentials", 401);
		}

		const tokenInfo = {
			usr_id: user.usr_id,
			usr_name: user.usr_name,
		};

		const accessToken = this.generateToken("access_token", tokenInfo);
		const refreshToken = this.generateToken("refresh_token", tokenInfo);

		return {
			accessToken,
			refreshToken,
		};
	}

	async logout(refreshToken: string): Promise<{ message: string }> {
		if (!refreshToken) {
			throw new AppError("No active session found", 401);
		}

		return {
			message: "Successfully logged out",
		};
	}

	async forgotPassword(usr_email: string): Promise<{ message: string }> {
		const user = await this.userService.findByEmail(usr_email);

		if (!user) {
			throw new AppError("The email was not found", 404);
		}

		const tokenInfo = {
			usr_id: user.usr_id,
			usr_name: user.usr_name,
		};

		const token = this.generateToken("reset_password_token", tokenInfo);

		const info = await transporter.sendMail(
			resetPasswordMail({
				to: usr_email,
				subject: "Password Reset",
				token,
			})
		);

		if (!info) {
			throw new AppError("The email was not found", 404);
		}

		return {
			message:
				"Check your email for instructions on resetting your password",
		};
	}

	async resetPasswordToken(token: string): Promise<{ token: string }> {
		const validateToken = this.verifyToken("reset_password_token", token);

		if (!validateToken) {
			throw new AppError("Invalid or expired token", 401);
		}

		return {
			token,
		};
	}

	async resetPassword(dto: ResetPasswordDTO): Promise<{ message: string }> {
		const { token, new_password } = dto;

		const validateToken = this.verifyToken("reset_password_token", token);

		if (!validateToken) {
			throw new AppError("Invalid or expired token", 401);
		}

		if (!new_password) {
			throw new AppError("The password cannot be empty", 400);
		}

		const hashedPassword = await bcrypt.hash(new_password, 10);

		await this.userService.updatePassword({
			usr_id: validateToken.usr_id,
			new_password: hashedPassword,
		});

		return {
			message: "Password updated successfully",
		};
	}

	async verification(token: string): Promise<{ message: string }> {
		const validateToken = this.verifyToken("verification_token", token);

		if (!validateToken) {
			throw new AppError(
				"Verification link expired. Please check your email for a new verification link",
				401
			);
		}

		await this.userService.updateVerification(validateToken.usr_id);

		return {
			message: "Email verified successfully",
		};
	}

	async resendVerification(usr_email: string): Promise<{ message: string }> {
		const user = await this.userService.findByEmail(usr_email);

		if (!user) {
			throw new AppError("The user was not found", 400);
		}

		if (user.usr_verified) {
			throw new AppError("Invalid request", 400);
		}

		const token = this.generateToken("verification_token", {
			usr_id: user.usr_id,
			usr_name: user.usr_name,
		});

		await transporter.sendMail(
			verificationMail({
				to: usr_email,
				subject: "Verify Your Email",
				token,
			})
		);

		return {
			message: "A new verification link has been sent to your email",
		};
	}

	async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
		if (!refreshToken) {
			throw new AppError("Forbidden", 403);
		}

		const decoded = this.verifyToken("refresh_token", refreshToken);

		if (!decoded) {
			throw new AppError("Forbidden", 403);
		}

		const tokenInfo = {
			usr_id: decoded.usr_id,
			usr_name: decoded.usr_name,
		};

		const accessToken = this.generateToken("access_token", tokenInfo);

		return {
			accessToken,
		};
	}

	public generateToken(type: Token, tokenInfo: ITokenInfo): string {
		const { usr_id, usr_name } = tokenInfo;

		if (type === "access_token") {
			return jwt.sign(
				{ usr_id, usr_name },
				process.env.ACCESS_TOKEN_SECRET as string,
				{
					expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
				}
			);
		}

		if (type === "refresh_token") {
			return jwt.sign(
				{ usr_id, usr_name },
				process.env.REFRESH_TOKEN_SECRET as string,
				{
					expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
				}
			);
		}

		if (type === "verification_token") {
			return jwt.sign(
				{ usr_id, usr_name },
				process.env.VERIFICATION_TOKEN_SECRET as string,
				{
					expiresIn: process.env.VERIFICATION_TOKEN_EXPIRES_IN,
				}
			);
		}

		return jwt.sign(
			{ usr_id, usr_name },
			process.env.RESET_PASSWORD_TOKEN_SECRET as string,
			{
				expiresIn: process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN,
			}
		);
	}

	public verifyToken(type: Token, token: string): IJwtPayload | null {
		try {
			if (type === "access_token") {
				return jwt.verify(
					token,
					process.env.ACCESS_TOKEN_SECRET as string
				) as IJwtPayload;
			}

			if (type === "refresh_token") {
				return jwt.verify(
					token,
					process.env.REFRESH_TOKEN_SECRET as string
				) as IJwtPayload;
			}

			if (type === "verification_token") {
				return jwt.verify(
					token,
					process.env.VERIFICATION_TOKEN_SECRET as string
				) as IJwtPayload;
			}

			return jwt.verify(
				token,
				process.env.TOKEN_SECRET as string
			) as IJwtPayload;
		} catch (error) {
			return null;
		}
	}
}
