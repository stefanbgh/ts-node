import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class RegisterValidator {
	@IsNotEmpty()
	@Length(3)
	usr_name!: string;

	@IsNotEmpty()
	@IsEmail()
	usr_email!: string;

	@IsNotEmpty()
	@Length(6)
	usr_password!: string;
}
