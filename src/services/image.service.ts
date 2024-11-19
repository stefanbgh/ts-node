import { inject, injectable } from "inversify";

import { AppError } from "../frameworks/errors/AppError";
import { ImageRepository } from "../repositories/image.repository";

import { UploadImageDTO } from "../ts/dtos/UploadImageDTO";
import { resizeImage } from "../utils/resizeImage";

@injectable()
export class ImageService {
	constructor(
		@inject(ImageRepository) private imageRepository: ImageRepository
	) {}

	async getImage(usr_id: number): Promise<{ data: string | null; message: string }>{
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

	async uploadImage(dto: UploadImageDTO): Promise<{ data: string, message: string }> {
		const usr_id = Number(dto.usr_id);
		const file = dto.file as Express.Multer.File;

		const image = await this.imageRepository.findByUserId(usr_id);

		if (image) {
			await this.imageRepository.deleteImage(usr_id);
		}

		const resizedImage = await resizeImage(file.buffer);

		const newImage = await this.imageRepository.createImage(
			resizedImage,
			usr_id
		);

		return {
			data: newImage.img_data.toString("base64"),
			message: "Image uploaded successfully",
		};
	}
}
