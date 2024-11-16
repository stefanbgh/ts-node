import { IsNotEmpty, IsInt, Min } from "class-validator";

export class ImageValidator {
	@IsInt()
	@Min(1)
	@IsNotEmpty()
	usr_id!: number;

	@IsNotEmpty()
	file!: Express.Multer.File;
}
