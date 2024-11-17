import { Response } from "express";
import { UserService } from "../services/user.service";
import { AppError } from "../errors/AppError";

import { inject } from "inversify";
import { Controller, Get, Param, Res } from "routing-controllers";
import { BaseController } from "./base.controller";

@Controller("/api/v1/users")
export class UserController implements BaseController {
	constructor(@inject(UserService) private userService: UserService) {}

	@Get("/")
	async getUsers(@Res() res: Response) {
		try {
			const users = await this.userService.getUsers();

			return res.status(200).json({ data: users });
		} catch (error) {
			return res.status(500).json({ message: "Internal server error" });
		}
	}

	@Get("/:id")
	async getSingleUser(@Param("id") id: string, @Res() res: Response) {
		try {
			const usr_id = Number(id);
			const user = await this.userService.getSingleUser(usr_id);

			return res.status(200).json({ data: user });
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });

				return;
			}

			return res.status(500).json({ message: "Internal server error" });
		}
	}
}
