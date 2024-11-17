import { Router } from "express";

import { inject, injectable } from "inversify";
import { UserController } from "../controllers/user.controller";

@injectable()
export class UserRoutes {
	private userRouter: Router;

	constructor(
		@inject(UserController) private userController: UserController
	) {
		this.userRouter = Router();
		this.setup();
	}

	private setup(): void {
		this.userRouter.get("/", (req, res) => this.userController.getUsers(req, res) );
		this.userRouter.get("/:id", (req, res) => this.userController.getSingleUser(req, res) );
	}

	get router(): Router {
		return this.userRouter;
	}
}
