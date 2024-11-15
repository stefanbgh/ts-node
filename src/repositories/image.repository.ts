import { injectable } from "inversify";
import { ImageEntity } from "../entities/image.entity";

import Image from "../models/Image.model";

@injectable()
export class ImageRepository {
	async findByUserId(usr_id: number): Promise<ImageEntity | null> {
		const image = await Image.findOne({ where: { usr_id } });

		if (image) {
			return new ImageEntity(image.usr_id, image.img_data, image.usr_id)
		}

		return null;
	}

	async createImage(img_data: Buffer, usr_id: number): Promise<ImageEntity> {
		const newImage = await Image.create({ img_data, usr_id });

		return new ImageEntity(newImage.img_id, newImage.img_data, newImage.usr_id);
	}

	async deleteImage(usr_id: number): Promise<void> {
		await Image.destroy({ where: { usr_id } });
	}
}
