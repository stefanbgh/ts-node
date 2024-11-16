import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginValidator {
	@IsNotEmpty()
	@IsEmail()
	usr_email!: string;

	@IsNotEmpty()
	usr_password!: string;
}
