import { IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordValidator {
	@IsString()
	@IsNotEmpty()
	token!: string;

	@IsString()
	@IsNotEmpty()
	new_password!: string;
}
