import express, { Express } from "express";

import { inject, injectable } from "inversify";
import { appContainer } from "../containers/app.container";
import { useContainer, useExpressServer } from "routing-controllers";
import { AuthController } from './../controllers/auth.controller';
import { UserController } from "../controllers/user.controller";
import { ImageController } from "../controllers/image.controller";
import { NotFoundController } from "../controllers/404.controller";
import { createTerminus } from "@godaddy/terminus";
import { Middlewares } from "../middlewares";
import { Port } from "../ts/types/Port";
import { logger } from "../utils/logger";

import http from "http";

@injectable()
export class App {
	private app: Express;
	private server: http.Server;
	private port: Port;

	constructor(
		@inject(Middlewares) private middlewares: Middlewares
	) {
		this.app = express();
		this.port = process.env.PORT;
		this.setupMiddlewares();
		this.setupRoutes();
		this.server = this.listen();
	}

	private setupMiddlewares(): void {
		this.middlewares.init(this.app);
	}

	private setupRoutes(): void {
		useContainer(appContainer);

		useExpressServer(this.app, {
			controllers: [AuthController, UserController, ImageController, NotFoundController],
		})
	}

	private listen(): http.Server {
		return this.app.listen(this.port, () => {
			logger.info(`Listening on: http://localhost:${this.port}`);
		});
	}

	private setupTerminus(): void {
		const onSignal = async (): Promise<void> => {
			logger.info("Server is starting cleanup.");
		};

		const onShutdown = async (): Promise<void> => {
			logger.info("Cleanup finished, server is shutting down.");
		};

		createTerminus(this.server, {
			signal: "SIGINT",
			onSignal,
			onShutdown,
		});
	}

	private setupHealthChecks(): void {
		createTerminus(this.server, {
			healthChecks: {
				"/healthcheck": async () => "OK",
			},
		});
	}

	public start(): void {
		this.setupTerminus();
		this.setupHealthChecks();
	}
}
