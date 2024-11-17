import { Request, Response } from "express";

import { AuthService } from "../services/auth.service";
import { AppError } from "../errors/AppError";

import { inject, injectable } from "inversify";
import { cookieOptions } from "../constants/cookieOptions.constant";

@injectable()
export class AuthController {
	constructor(@inject(AuthService) private authService: AuthService) {}

	async register(req: Request, res: Response): Promise<void> {
		try {
			const dto = req.body;
			const { message } = await this.authService.register(dto);

			res.status(201).json({ message });
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });

				return;
			}

			res.status(500).json({ message: "Internal server error" });
		}
	}

	async login(req: Request, res: Response): Promise<void> {
		try {
			const dto = req.body;
			const { accessToken, refreshToken } = await this.authService.login(dto);

			res.cookie("jwt", refreshToken, cookieOptions);
			res.status(200).json({ accessToken });
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });

				return;
			}

			res.status(500).json({ message: "Internal server error" });
		}
	}

	async logout(req: Request, res: Response): Promise<void> {
		try {
			const refreshToken = req.cookies.jwt;
			const { message } = await this.authService.logout(refreshToken);

			res.clearCookie("jwt", cookieOptions);
			res.status(200).send({ message });
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });

				return;
			}

			res.status(500).json({ message: "Internal server error" });
		}
	}

	async forgotPassword(req: Request, res: Response): Promise<void> {
		try {
			const { usr_email } = req.body;
			const { message } = await this.authService.forgotPassword(usr_email);

			res.status(200).json({ message });
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });

				return;
			}

			res.status(500).json({ message: "Internal server error" });
		}
	}

	async resetPasswordToken(req: Request, res: Response): Promise<void> {
		try {
			const getToken = req.params.token;
			const { token } = await this.authService.resetPasswordToken(getToken);

			res.status(200).json({ token });
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });

				return;
			}

			res.status(500).json({ message: "Internal server error" });
		}
	}

	async resetPassword(req: Request, res: Response): Promise<void> {
		try {
			const dto = req.body;
			const { message } = await this.authService.resetPassword(dto);

			res.status(200).json({ message });
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });

				return;
			}

			res.status(500).json({ message: "Internal server error" });
		}
	}

	async verification(req: Request, res: Response): Promise<void> {
		try {
			const { token } = req.params;
			const { message } = await this.authService.verification(token);

			res.status(200).json({ message });
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });

				return;
			}

			res.status(500).json({ message: "Internal server error" });
		}
	}

	async resendVerification(req: Request, res: Response): Promise<void> {
		try {
			const { usr_email } = req.body;
			const { message } = await this.authService.resendVerification(usr_email);

			res.status(200).json({ message });
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });

				return;
			}

			res.status(500).json({ message: "Internal server error" });
		}
	}

	async refreshToken(req: Request, res: Response): Promise<void> {
		try {
			const refreshToken = req.cookies.jwt;
			const { accessToken } = await this.authService.refreshToken(refreshToken);

			res.status(200).json({ accessToken });
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });

				return;
			}

			res.status(500).json({ message: "Internal server error" });
		}
	}
}
