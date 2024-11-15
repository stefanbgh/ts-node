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
		app.use("/api/v1/auth", this.authRoutes.getRouter());
		app.use("/api/v1/users", this.jwtAuth.authenticate.bind(this.jwtAuth), this.userRoutes.getRouter());
		app.use("/api/v1/images", this.jwtAuth.authenticate.bind(this.jwtAuth), this.imageRoutes.getRouter());
		app.use("*", this.notFoundRoutes.getRouter());
	}
}
