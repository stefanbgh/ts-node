import { AppError } from "../errors/AppError";
import { Request } from "express";
import { ImageRepository } from "../repositories/image.repository";
import { UserRepository } from "../repositories/user.repository";

export class ImageService {
	constructor(
		private imageRepository: ImageRepository,
		private userRepository: UserRepository
	) {}

	async getImage(
		req: Request
	): Promise<{ data: string | null; message: string }> {
		const usr_id = Number(req.params.id);

		if (!usr_id) {
			throw new AppError("The user ID is required", 400);
		}

		const user = await this.userRepository.findById(usr_id);

		if (!user) {
			throw new AppError("The user was not found", 404);
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

		const user = await this.userRepository.findById(usr_id);

		if (!user) {
			throw new AppError("The user was not found", 404);
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
