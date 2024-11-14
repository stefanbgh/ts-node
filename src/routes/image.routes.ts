import express from "express";

import { container } from "../config/inversify.config";
import { TYPES } from "../config/types.config";
import { ImageController } from "../controllers/image.controller";

import upload from "../utils/upload";

const router = express.Router();

const imageController = container.get<ImageController>(TYPES.ImageController);

router.post("/", upload.single("img_data"), (req, res) =>
	imageController.uploadImage(req, res)
);
router.get("/:id", (req, res) => imageController.getImage(req, res));

export { router as imageRoutes };
