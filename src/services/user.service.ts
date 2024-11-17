import { UserRepository } from "../repositories/user.repository";
import { UserEntity } from "../entities/user.entity";
import { CreateUserDTO } from "../ts/dtos/CreateUserDTO";
import { UpdatePasswordDTO } from "../ts/dtos/UpdatePasswordDTO";
import { AppError } from "../errors/AppError";

import { inject, injectable } from "inversify";

@injectable()
export class UserService {
	constructor(
		@inject(UserRepository) private userRepository: UserRepository
	) {}

	async getUsers(): Promise<UserEntity[] | []> {
		return await this.userRepository.findAll();
	}

	async getSingleUser(usr_id: number): Promise<UserEntity | null> {
		if (!usr_id) {
			throw new AppError("The user ID is required", 400);
		}

		if (isNaN(usr_id)) {
			throw new AppError("Invalid user ID", 400);
		}

		return await this.userRepository.findById(usr_id);
	}

	async findByEmail(usr_email: string): Promise<UserEntity | null> {
		return await this.userRepository.findByEmail(usr_email);
	}

	async createUser(dto: CreateUserDTO): Promise<UserEntity> {
		return await this.userRepository.create(dto);
	}

	async updatePassword(dto: UpdatePasswordDTO): Promise<null> {
		return await this.userRepository.updatePassword(dto);
	}

	async updateVerification(usr_id: number): Promise<null> {
		return await this.userRepository.updateVerification(usr_id);
	}
}
