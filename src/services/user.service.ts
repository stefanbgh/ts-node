import { UserRepository } from "../repositories/user.repository";
import { UserEntity } from "../entities/user.entity";
import { UserPasswordEntity } from "../entities/userPassword.entity";
import { CreateUserDTO } from "../ts/dtos/CreateUserDTO";
import { UpdatePasswordDTO } from "../ts/dtos/UpdatePasswordDTO";
import { AppError } from "../errors/AppError";
import { Request } from "express";

import { inject, injectable } from "inversify";
import { TYPES } from "../config/types.config";

@injectable()
export class UserService {
	constructor(
		@inject(TYPES.UserRepository) private userRepository: UserRepository
	) {}

	async getUsers(): Promise<UserEntity[] | []> {
		return await this.userRepository.findAll();
	}

	async getSingleUser(req: Request): Promise<UserEntity | null> {
		const usr_id = Number(req.params.id);

		if (isNaN(usr_id)) {
			throw new AppError("Invalid user ID", 400);
		}

		const user = await this.userRepository.findById(usr_id);

		return user;
	}

	async findByEmail(usr_email: string): Promise<UserPasswordEntity | null> {
		return this.userRepository.findByEmail(usr_email);
	}

	async createUser(dto: CreateUserDTO): Promise<UserEntity> {
		return this.userRepository.create(dto);
	}

	async updatePassword(dto: UpdatePasswordDTO): Promise<null> {
		return this.userRepository.updatePassword(dto);
	}

	async updateVerification(usr_id: number): Promise<null> {
		return this.userRepository.updateVerification(usr_id);
	}
}
