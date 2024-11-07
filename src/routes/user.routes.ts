import express from "express";

import { UserRepository } from "../repositories/user.repository";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/", (req, res) => userController.getUsers(req, res));
router.get("/:id", (req, res) => userController.getSingleUser(req, res));

export { router as userRoutes };
