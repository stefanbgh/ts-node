import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ImageService } from "../services/image.service";

import { inject, injectable } from "inversify";
import { TYPES } from "../config/types.config";

@injectable()
export class ImageController {
	constructor(
		@inject(TYPES.ImageService) private imageService: ImageService
	) {}

	async getImage(req: Request, res: Response): Promise<any> {
		try {
			const { data, message } = await this.imageService.getImage(req);

			res.status(200).json({ data, message });
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });
				return;
			}

			res.status(500).json({ message: "Internal server error" });
		}
	}

	async uploadImage(req: Request, res: Response): Promise<void> {
		try {
			const { data, message } = await this.imageService.uploadImage(req);

			res.status(201).json({ data, message });
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });

				return;
			}

			res.status(500).json({ message: "Internal server error" });
		}
	}
}
