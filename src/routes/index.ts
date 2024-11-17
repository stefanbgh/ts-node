import { Express } from "express";

import { NotFoundRoutes } from "./404.routes";
import { JwtAuth } from "../middlewares/jwt";

import { inject, injectable } from "inversify";

@injectable()
export class Routes {
	constructor(
		@inject(JwtAuth) private jwtAuth: JwtAuth,
		@inject(NotFoundRoutes) private notFoundRoutes: NotFoundRoutes
	) {}

	init(app: Express): void {
		app.use("*", this.notFoundRoutes.router);
	}
}
