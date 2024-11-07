import express from "express";

import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

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
