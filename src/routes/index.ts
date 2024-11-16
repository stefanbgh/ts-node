import { Express } from "express";

import { AuthRoutes } from "./auth.routes";
import { UserRoutes } from "./user.routes";
import { ImageRoutes } from "./image.routes";
import { NotFoundRoutes } from "./404.routes";
import { JwtAuth } from "../middlewares/jwt";

import { TYPES } from "../config/types.config";
import { inject, injectable } from "inversify";

@injectable()
export class Routes {
	constructor(
		@inject(TYPES.JwtAuth) private jwtAuth: JwtAuth,
		@inject(TYPES.AuthRoutes) private authRoutes: AuthRoutes,
		@inject(TYPES.UserRoutes) private userRoutes: UserRoutes,
		@inject(TYPES.ImageRoutes) private imageRoutes: ImageRoutes,
		@inject(TYPES.NotFoundRoutes) private notFoundRoutes: NotFoundRoutes,
	) {}

	init(app: Express): void {
		const authGuard = this.jwtAuth.authenticate.bind(this.jwtAuth);

		app.use("/api/v1/auth", this.authRoutes.router);
		app.use("/api/v1/users", authGuard, this.userRoutes.router);
		app.use("/api/v1/images", authGuard, this.imageRoutes.router);
		app.use("*", this.notFoundRoutes.router);
	}
}
