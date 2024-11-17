import { IsNotEmpty } from "class-validator";

export class ImageValidator {
	@IsNotEmpty()
	usr_id!: string;

	@IsNotEmpty()
	file!: Express.Multer.File;
}
