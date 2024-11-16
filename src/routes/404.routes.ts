import { Router } from "express";
import { NotFoundController } from "../controllers/404.controller";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types.config";

@injectable()
export class NotFoundRoutes {
	private notFoundRouter: Router;

	constructor(
		@inject(TYPES.NotFoundController)
		private notFoundController: NotFoundController
	) {
		this.notFoundRouter = Router();
		this.setup();
	}

	private setup(): void {
		this.notFoundRouter.get("*", (req, res) => this.notFoundController.notFound(req, res) );
	}

	get router(): Router {
		return this.notFoundRouter;
	}
}
