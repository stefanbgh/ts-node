import { IsEmail, IsNotEmpty } from "class-validator";

export class EmailValidator {
	@IsNotEmpty()
	@IsEmail()
	usr_email!: string;
}
