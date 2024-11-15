import { Router } from "express";

import { inject, injectable } from "inversify";
import { UserController } from "../controllers/user.controller";
import { TYPES } from "../config/types.config";

@injectable()
export class UserRoutes {
	private router: Router;

	constructor(
		@inject(TYPES.UserController) private userController: UserController
	) {
		this.router = Router();
		this.setup();
	}

	private setup(): void {
		this.router.get("/", (req, res) => this.userController.getUsers(req, res) );
		this.router.get("/:id", (req, res) => this.userController.getSingleUser(req, res) );
	}

	public getRouter(): Router {
		return this.router;
	}
}
