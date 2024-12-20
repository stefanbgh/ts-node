import { injectable } from "inversify";
import { UserEntity } from "../entities/user.entity";
import { CreateUserDTO } from "../ts/dtos/CreateUserDTO";
import { UpdatePasswordDTO } from "../ts/dtos/UpdatePasswordDTO";

import User from "../models/User.model";

@injectable()
export class UserRepository {
	async findAll(): Promise<UserEntity[]> {
		const users = await User.findAll();
		return users.map(
			(user) =>
				new UserEntity(
					user.usr_id,
					user.usr_name,
					user.usr_email,
					user.usr_verified,
					user.rol_id,
					user.usr_password
				)
		);
	}

	async findById(usr_id: number): Promise<UserEntity | null> {
		const user = await User.findByPk(usr_id);
		if (user) {
			return new UserEntity(
				user.usr_id,
				user.usr_name,
				user.usr_email,
				user.usr_verified,
				user.rol_id,
				user.usr_password
			);
		}
		return null;
	}

	async findByEmail(usr_email: string): Promise<UserEntity | null> {
		const user = await User.findOne({ where: { usr_email } });

		if (user) {
			return new UserEntity(
				user.usr_id,
				user.usr_name,
				user.usr_email,
				user.usr_verified,
				user.rol_id,
				user.usr_password
			);
		}

		return null;
	}

	async create(dto: CreateUserDTO): Promise<UserEntity> {
		const { usr_name, usr_email, usr_password } = dto;

		const user = await User.create({
			usr_name,
			usr_email,
			usr_password,
		});

		return new UserEntity(
			user.usr_id,
			user.usr_name,
			user.usr_email,
			user.usr_verified,
			user.rol_id,
			user.usr_password
		);
	}

	async updatePassword(dto: UpdatePasswordDTO): Promise<null> {
		const { usr_id, new_password } = dto;

		await User.update(
			{ usr_password: new_password },
			{ where: { usr_id } }
		);

		return null;
	}

	async updateVerification(usr_id: number): Promise<null> {
		await User.update({ usr_verified: true }, { where: { usr_id } });

		return null;
	}

	async delete(usr_id: number): Promise<void> {
		await User.destroy({ where: { usr_id } });
	}
}
