import { Router } from "express";

import { TYPES } from "../config/types.config";
import { AuthController } from "../controllers/auth.controller";
import { inject, injectable } from "inversify";
import { validateRequest } from "../middlewares/validateRequest";
import { RegisterValidator } from "../utils/validators/register.validator";
import { LoginValidator } from "../utils/validators/login.validator";
import { EmailValidator } from "../utils/validators/email.validator";
import { ResetPasswordValidator } from "../utils/validators/resetPassword.validator";
import { TokenValidator } from "../utils/validators/token.validator";

@injectable()
export class AuthRoutes {
	private authRouter: Router;

	constructor(
		@inject(TYPES.AuthController) private authController: AuthController
	) {
		this.authRouter = Router();
		this.setup();
	}

	private setup(): void {
		this.authRouter.post(
			"/register",
			validateRequest(RegisterValidator),
			(req, res) => this.authController.register(req, res)
		);
		this.authRouter.post(
			"/login",
			validateRequest(LoginValidator),
			(req, res) => this.authController.login(req, res)
		);
		this.authRouter.post(
			"/logout",
			validateRequest(TokenValidator),
			(req, res) => this.authController.logout(req, res)
		);
		this.authRouter.post(
			"/forgot-password",
			validateRequest(EmailValidator),
			(req, res) => this.authController.forgotPassword(req, res)
		);
		this.authRouter.get("/reset-password/:token", (req, res) => this.authController.resetPasswordToken(req, res));
		this.authRouter.post(
			"/reset-password",
			validateRequest(ResetPasswordValidator),
			(req, res) => this.authController.resetPassword(req, res)
		);
		this.authRouter.get("/verification-email/:token", (req, res) => this.authController.verification(req, res));
		this.authRouter.post(
			"/resend-verification",
			validateRequest(EmailValidator),
			(req, res) => this.authController.resendVerification(req, res)
		);
		this.authRouter.post(
			"/refresh-token",
			validateRequest(TokenValidator),
			(req, res) => this.authController.refreshToken(req, res)
		);
	}

	get router(): Router {
		return this.authRouter;
	}
}
