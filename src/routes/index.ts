import { Express } from "express";

import { AuthRoutes } from "./auth.routes";
import { UserRoutes } from "./user.routes";
import { NotFoundRoutes } from "./404.routes";
import { JwtAuth } from "../middlewares/jwt";

import { inject, injectable } from "inversify";

@injectable()
export class Routes {
	constructor(
		@inject(JwtAuth) private jwtAuth: JwtAuth,
		@inject(AuthRoutes) private authRoutes: AuthRoutes,
		@inject(UserRoutes) private userRoutes: UserRoutes,
		@inject(NotFoundRoutes) private notFoundRoutes: NotFoundRoutes
	) {}

	init(app: Express): void {
		const authGuard = this.jwtAuth.authenticate.bind(this.jwtAuth);

		app.use("/api/v1/auth", this.authRoutes.router);
		app.use("/api/v1/users", authGuard, this.userRoutes.router);
		app.use("*", this.notFoundRoutes.router);
	}
}
