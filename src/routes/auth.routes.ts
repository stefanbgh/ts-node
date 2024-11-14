import express from "express";

import { container } from "../config/inversify.config";
import { TYPES } from "../config/types.config";
import { AuthController } from "../controllers/auth.controller";

const router = express.Router();

const authController = container.get<AuthController>(TYPES.AuthController);

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.post("/logout", (req, res) => authController.logout(req, res));
router.post("/forgot-password", (req, res) =>
	authController.forgotPassword(req, res)
);
router.get("/reset-password/:token", (req, res) =>
	authController.resetPasswordToken(req, res)
);
router.post("/reset-password", (req, res) =>
	authController.resetPassword(req, res)
);
router.post("/refresh-token", (req, res) =>
	authController.refreshToken(req, res)
);
router.get("/verification-email/:token", (req, res) =>
	authController.verification(req, res)
);
router.post("/resend-verification", (req, res) =>
	authController.resendVerification(req, res)
);

export { router as authRoutes };
