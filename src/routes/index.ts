import { Express } from "express";

import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { imageRoutes } from "./image.routes";
import { notFoundRoutes } from "./404.routes";
import { JwtAuth } from "../middlewares/jwt";

import { container } from "../config/inversify.config";
import { TYPES } from "../config/types.config";

export default function (app: Express) {
	const jwtAuth = container.get<JwtAuth>(TYPES.JwtAuth);

	app.use("/api/v1/auth", authRoutes);
	app.use("/api/v1/users", jwtAuth.authenticate.bind(jwtAuth), userRoutes);
	app.use("/api/v1/images", jwtAuth.authenticate.bind(jwtAuth), imageRoutes);
	app.use("*", notFoundRoutes);
}
