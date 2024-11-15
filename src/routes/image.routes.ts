import { Router } from "express";

import { TYPES } from "../config/types.config";
import { ImageController } from "../controllers/image.controller";
import { inject, injectable } from "inversify";

import upload from "../utils/upload";

@injectable()
export class ImageRoutes {
	private router: Router;

	constructor(
		@inject(TYPES.ImageController) private imageController: ImageController
	) {
		this.router = Router();
		this.setup();
	}

	private setup(): void {
		this.router.post("/", upload.single("img_data"), (req, res) => this.imageController.uploadImage(req, res) );
		this.router.get("/:id", (req, res) => this.imageController.getImage(req, res) );
	}

	public getRouter(): Router {
		return this.router;
	}
}
