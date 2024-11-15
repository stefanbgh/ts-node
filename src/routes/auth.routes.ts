import { Router } from "express";

import { TYPES } from "../config/types.config";
import { AuthController } from "../controllers/auth.controller";
import { inject, injectable } from "inversify";

@injectable()
export class AuthRoutes {
	private router: Router;

	constructor(
		@inject(TYPES.AuthController) private authController: AuthController
	) {
		this.router = Router();
		this.setup();
	}

	private setup(): void {
		this.router.post("/register", (req, res) => this.authController.register(req, res) );
		this.router.post("/login", (req, res) => this.authController.login(req, res) );
		this.router.post("/logout", (req, res) => this.authController.logout(req, res) );
		this.router.post("/forgot-password", (req, res) => this.authController.forgotPassword(req, res) );
		this.router.get("/reset-password/:token", (req, res) => this.authController.resetPasswordToken(req, res) );
		this.router.post("/reset-password", (req, res) => this.authController.resetPassword(req, res) );
		this.router.post("/refresh-token", (req, res) => this.authController.refreshToken(req, res) );
		this.router.get("/verification-email/:token", (req, res) => this.authController.verification(req, res) );
		this.router.post("/resend-verification", (req, res) => this.authController.resendVerification(req, res) );
	}

	public getRouter(): Router {
		return this.router;
	}
}
