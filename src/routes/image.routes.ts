import { Router } from "express";

import { TYPES } from "../config/types.config";
import { ImageController } from "../controllers/image.controller";
import { inject, injectable } from "inversify";

import upload from "../utils/upload";
import { validateRequest } from "../middlewares/validateRequest";
import { ImageValidator } from "../utils/validators/image.validator";

@injectable()
export class ImageRoutes {
	private imageRouter: Router;

	constructor(
		@inject(TYPES.ImageController) private imageController: ImageController
	) {
		this.imageRouter = Router();
		this.setup();
	}

	private setup(): void {
		this.imageRouter.post(
			"/",
			validateRequest(ImageValidator),
			upload.single("img_data"),
			(req, res) => this.imageController.uploadImage(req, res)
		);
		this.imageRouter.get("/:id", (req, res) => this.imageController.getImage(req, res));
	}

	get router(): Router {
		return this.imageRouter;
	}
}
