import { AppError } from "../errors/AppError";
import { ImageRepository } from "../repositories/image.repository";

import { inject, injectable } from "inversify";
import { TYPES } from "../config/types.config";
import { UploadImageDTO } from "../ts/dtos/UploadImageDTO";

@injectable()
export class ImageService {
	constructor(
		@inject(TYPES.ImageRepository) private imageRepository: ImageRepository
	) {}

	async getImage(
		usr_id: number
	): Promise<{ data: string | null; message: string }> {
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

	async uploadImage(dto: UploadImageDTO): Promise<any> {
		const usr_id = Number(dto.usr_id);
		const file = dto.file as Express.Multer.File;

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
