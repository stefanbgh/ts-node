import { Express } from "express";

import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { notFoundRoutes } from "./404.routes";

import { jwtAuth } from "../middlewares/jwt";

export default function (app: Express) {
	app.use("/api/v1/auth", authRoutes);
	app.use("/api/v1/users", jwtAuth, userRoutes);
	app.use("*", notFoundRoutes);
}
