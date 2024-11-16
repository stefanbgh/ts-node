import { IsNotEmpty, Matches } from "class-validator";
import { tokenRegEx } from "../regex/token.regex";

export class TokenValidator {
	@IsNotEmpty()
	@Matches(tokenRegEx, {
		message: "Token must be a valid Base64 or JWT string",
	})
	token!: string;
}
