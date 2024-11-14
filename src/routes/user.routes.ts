import express from "express";

import { container } from "../config/inversify.config";
import { TYPES } from "../config/types.config";
import { UserController } from "../controllers/user.controller";

const router = express.Router();

const userController = container.get<UserController>(TYPES.UserController);

router.get("/", (req, res) => userController.getUsers(req, res));
router.get("/:id", (req, res) => userController.getSingleUser(req, res));

export { router as userRoutes };
