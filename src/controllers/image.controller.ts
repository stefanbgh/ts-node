import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ImageService } from "../services/image.service";

export class ImageController {
	constructor(private imageService: ImageService) {}

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
