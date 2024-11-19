import { Request, Response } from "express";

import { AuthService } from "../services/auth.service";
import { AppError } from "../frameworks/errors/AppError";

import { inject } from "inversify";
import { cookieOptions } from "../constants/cookieOptions.constant";
import { Controller, Get, Param, Post, Req, Res, UseBefore } from "routing-controllers";
import { validateRequest } from "../frameworks/middlewares/validateRequest";
import { LoginValidator } from "../utils/validators/login.validator";
import { RegisterValidator } from "../utils/validators/register.validator";
import { TokenValidator } from "../utils/validators/token.validator";
import { EmailValidator } from "../utils/validators/email.validator";
import { ResetPasswordValidator } from "../utils/validators/resetPassword.validator";

@Controller("/api/v1/auth")
export class AuthController {
	constructor(@inject(AuthService) private authService: AuthService) {}

	@Post("/register")
	@UseBefore(validateRequest(RegisterValidator))
	async register(@Req() req: Request, @Res() res: Response) {
		try {
			const dto = req.body;
			const { message } = await this.authService.register(dto);

			return res.status(201).json({ message });
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({ message: error.message });
			}

			return res.status(500).json({ message: "Internal server error" });
		}
	}

	@Post("/login")
	@UseBefore(validateRequest(LoginValidator))
	async login(@Req() req: Request, @Res() res: Response) {
		try {
			const dto = req.body;
			const { accessToken, refreshToken } = await this.authService.login(dto);

			res.cookie("jwt", refreshToken, cookieOptions);

			return res.status(200).json({ accessToken });
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({ message: error.message });
			}

			return res.status(500).json({ message: "Internal server error" });
		}
	}

	@Post("/logout")
	@UseBefore(validateRequest(TokenValidator))
	async logout(@Req() req: Request, @Res() res: Response) {
		try {
			const refreshToken = req.cookies.jwt;
			const { message } = await this.authService.logout(refreshToken);

			res.clearCookie("jwt", cookieOptions);
			
			return res.status(200).send({ message });
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({ message: error.message });
			}

			return res.status(500).json({ message: "Internal server error" });
		}
	}

	@Post("/forgot-password")
	@UseBefore(validateRequest(EmailValidator))
	async forgotPassword(@Req() req: Request, @Res() res: Response) {
		try {
			const { usr_email } = req.body;
			const { message } = await this.authService.forgotPassword(usr_email);

			return res.status(200).json({ message });
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({ message: error.message });
			}

			return res.status(500).json({ message: "Internal server error" });
		}
	}

	@Get("/reset-password/:token")
	async resetPasswordToken(@Param("token") get_token: string, req: Request, @Res() res: Response) {
		try {
			const { token } = await this.authService.resetPasswordToken(get_token);

			return res.status(200).json({ token });
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({ message: error.message });
			}

			return res.status(500).json({ message: "Internal server error" });
		}
	}

	@Post("/reset-password")
	@UseBefore(validateRequest(ResetPasswordValidator))
	async resetPassword(@Req() req: Request, @Res() res: Response) {
		try {
			const dto = req.body;
			const { message } = await this.authService.resetPassword(dto);

			return res.status(200).json({ message });
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({ message: error.message });
			}

			return res.status(500).json({ message: "Internal server error" });
		}
	}

	@Get("/verification-email/:token")
	async verification(@Param("token") token: string, @Res() res: Response) {
		try {
			const { message } = await this.authService.verification(token);

			return res.status(200).json({ message });
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({ message: error.message });
			}

			return res.status(500).json({ message: "Internal server error" });
		}
	}

	@Post("/resend-verification")
	@UseBefore(validateRequest(EmailValidator))
	async resendVerification(@Req() req: Request, @Res() res: Response) {
		try {
			const { usr_email } = req.body;
			const { message } = await this.authService.resendVerification(usr_email);

			return res.status(200).json({ message });
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({ message: error.message });
			}

			return res.status(500).json({ message: "Internal server error" });
		}
	}

	@Post("/refresh-token")
	@UseBefore(validateRequest(TokenValidator))
	async refreshToken(@Req() req: Request, @Res() res: Response) {
		try {
			const refreshToken = req.cookies.jwt;
			const { accessToken } = await this.authService.refreshToken(refreshToken);

			return res.status(200).json({ accessToken });
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({ message: error.message });
			}

			return res.status(500).json({ message: "Internal server error" });
		}
	}
}
