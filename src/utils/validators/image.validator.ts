import { IsNotEmpty } from "class-validator";

export class ImageValidator {
	@IsNotEmpty()
	usr_id!: string;

	@IsNotEmpty()
	img_data!: Express.Multer.File;
}
