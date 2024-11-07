import { Role } from "../ts/types/Role";
import { UserEntity } from "./user.entity";

export class UserPasswordEntity extends UserEntity {
	constructor(
		usr_id: number,
		usr_email: string,
		usr_name: string,
		usr_verified: boolean,
		usr_role: Role,
		private usr_password: string
	) {
		super(usr_id, usr_name, usr_email, usr_verified, usr_role);
	}

	getPassword(): string {
		return this.usr_password;
	}
}
