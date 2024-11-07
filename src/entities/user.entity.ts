import { Role } from "../ts/types/Role";

export class UserEntity {
	constructor(
		public usr_id: number,
		public usr_name: string,
		public usr_email: string,
		public usr_verified: boolean,
		public usr_role: Role
	) {}
}
