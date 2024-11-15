import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ImageService } from "../services/image.service";

import { inject, injectable } from "inversify";
import { TYPES } from "../config/types.config";
import { UploadImageDTO } from "../ts/dtos/UploadImageDTO";

@injectable()
export class ImageController {
	constructor(
		@inject(TYPES.ImageService) private imageService: ImageService
	) {}

	async getImage(req: Request, res: Response): Promise<any> {
		try {
			const usr_id = Number(req.params.id);

			const { data, message } = await this.imageService.getImage(usr_id);

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
			const dto: UploadImageDTO = { usr_id: req.body.usr_id, file: req.file }
			const { data, message } = await this.imageService.uploadImage(dto);

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
