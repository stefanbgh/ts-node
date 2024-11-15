import { Router } from "express";
import { NotFoundController } from "../controllers/404.controller";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types.config";

@injectable()
export class NotFoundRoutes {
	private router: Router;

	constructor(
		@inject(TYPES.NotFoundController)
		private notFoundController: NotFoundController
	) {
		this.router = Router();
		this.setup();
	}

	private setup(): void {
		this.router.get("*", (req, res) => this.notFoundController.notFound(req, res) );
	}

	public getRouter(): Router {
		return this.router;
	}
}
