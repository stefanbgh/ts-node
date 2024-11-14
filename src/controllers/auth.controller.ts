import { Request, Response } from "express";

import { AuthService } from "../services/auth.service";
import { AppError } from "../errors/AppError";

import { inject, injectable } from "inversify";
import { TYPES } from "../config/types.config";

@injectable()
export class AuthController {
	constructor(@inject(TYPES.AuthService) private authService: AuthService) {}

	async register(req: Request, res: Response): Promise<void> {
		try {
			const { message } = await this.authService.register(req);

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
			const { accessToken } = await this.authService.login(req, res);

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
			const { message } = await this.authService.logout(req, res);

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
			const { message } = await this.authService.forgotPassword(req);

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
			const { token } = await this.authService.resetPasswordToken(req);

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
			const { message } = await this.authService.resetPassword(req);

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
			const { message } = await this.authService.verification(req);

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
			const { message } = await this.authService.resendVerification(req);

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
			const { accessToken } = await this.authService.refreshToken(req);

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
