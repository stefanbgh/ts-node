import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AppError } from "../errors/AppError";

import { inject, injectable } from "inversify";
import { TYPES } from "../config/types.config";

@injectable()
export class UserController {
	constructor(@inject(TYPES.UserService) private userService: UserService) {}

	async getUsers(_: Request, res: Response): Promise<void> {
		try {
			const users = await this.userService.getUsers();

			res.status(200).json({ data: users });
		} catch (error) {
			res.status(500).json({ message: "Internal server error" });
		}
	}

	async getSingleUser(req: Request, res: Response): Promise<void> {
		try {
			const usr_id = Number(req.params.id);
			const user = await this.userService.getSingleUser(usr_id);

			res.status(200).json({ data: user });
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });

				return;
			}

			res.status(500).json({ message: "Internal server error" });
		}
	}
}
