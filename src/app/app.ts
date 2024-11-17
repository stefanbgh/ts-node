import express, { Express } from "express";

import { createTerminus } from "@godaddy/terminus";
import { logger } from "../utils/logger";
import { Port } from "../ts/types/Port";
import { Middlewares } from "../middlewares";
import { inject, injectable } from "inversify";
import { useContainer, useExpressServer } from "routing-controllers";
import { ImageController } from "../controllers/image.controller";
import { appContainer } from "../containers/app.container";

import http from "http";
import { UserController } from "../controllers/user.controller";

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
		this.setupRoutes();
		this.server = this.listen();
	}

	private setupRoutes(): void {
		useContainer(appContainer);
		useExpressServer(this.app, {
			controllers: [UserController, ImageController],
			middlewares: this.middlewares.init()
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
