import express from "express";

import { ImageRepository } from "../repositories/image.repository";
import { ImageService } from "../services/image.service";
import { ImageController } from "../controllers/image.controller";

import upload from "../utils/upload";
import { UserRepository } from "../repositories/user.repository";

const router = express.Router();

const userRepository = new UserRepository();
const imageRepository = new ImageRepository();
const imageService = new ImageService(imageRepository, userRepository);
const imageController = new ImageController(imageService);

router.post("/", upload.single("img_data"), (req, res) =>
	imageController.uploadImage(req, res)
);

export { router as imageRoutes };
