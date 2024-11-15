import { injectable } from "inversify";
import { ImageEntity } from "../entities/image.entity";

import Image from "../models/Image.model";

@injectable()
export class ImageRepository {
	async findByUserId(usr_id: number): Promise<ImageEntity | null> {
		const image = await Image.findOne({ where: { usr_id } });

		if (image) {
			return {
				img_id: image.img_id,
				img_data: image.img_data,
				usr_id: image.usr_id,
			};
		}

		return null;
	}

	async createImage(img_data: Buffer, usr_id: number): Promise<ImageEntity> {
		const newImage = await Image.create({ img_data, usr_id });

		return {
			img_id: newImage.img_id,
			img_data: newImage.img_data,
			usr_id: newImage.usr_id,
		};
	}

	async deleteImage(usr_id: number): Promise<void> {
		await Image.destroy({ where: { usr_id } });
	}
}
