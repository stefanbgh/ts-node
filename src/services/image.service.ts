import { AppError } from "../errors/AppError";
import { Request } from "express";
import { ImageRepository } from "../repositories/image.repository";
import { UserRepository } from "../repositories/user.repository";

import { inject, injectable } from "inversify";
import { TYPES } from "../config/types.config";

@injectable()
export class ImageService {
	constructor(
		@inject(TYPES.ImageRepository) private imageRepository: ImageRepository,
	) {}

	async getImage(
		req: Request
	): Promise<{ data: string | null; message: string }> {
		const usr_id = Number(req.params.id);

		if (!usr_id) {
			throw new AppError("The user ID is required", 400);
		}

		const image = await this.imageRepository.findByUserId(usr_id);

		if (!image) {
			return {
				data: null,
				message: "Image not found",
			};
		}

		return {
			data: image.img_data.toString("base64"),
			message: "Image fetched successfully",
		};
	}

	async uploadImage(req: Request): Promise<any> {
		const usr_id = Number(req.body.usr_id);
		const file = req.file;

		if (!file) {
			throw new AppError("No file uploaded", 400);
		}

		if (!usr_id) {
			throw new AppError("The user ID is required", 400);
		}

		const image = await this.imageRepository.findByUserId(usr_id);

		if (image) {
			await this.imageRepository.deleteImage(usr_id);
		}

		const newImage = await this.imageRepository.createImage(
			file.buffer,
			usr_id
		);

		return {
			data: newImage.img_data,
			message: "Image uploaded successfully",
		};
	}
}
