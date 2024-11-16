import { Role } from "../ts/types/Role";

export class UserEntity {
	constructor(
		public usr_id: number,
		public usr_name: string,
		public usr_email: string,
		public usr_verified: boolean,
		public rol_id: Role,
		private usr_password: string
	) {}

	get passwordValue(): string {
		return this.usr_password;
	}
}
