import express, { Express } from "express";

import { inject, injectable } from "inversify";
import { MiddlewaresSetup } from "../frameworks/setup/middlewares.setup";
import { RoutesSetup } from "../frameworks/setup/routes.setup";
import { ServerSetup } from "../frameworks/setup/server.setup";
import { TerminusSetup } from "../frameworks/setup/terminus.setup";
import { Port } from "../ts/types/Port";

@injectable()
export class App {
	private app: Express;
	private port: Port;

	constructor(
		@inject(MiddlewaresSetup) private middlewaresSetup: MiddlewaresSetup,
		@inject(RoutesSetup) private routesSetup: RoutesSetup,
		@inject(ServerSetup) private serverSetup: ServerSetup,
		@inject(TerminusSetup) private terminusSetup: TerminusSetup
	) {
		this.app = express();
		this.port = process.env.PORT;
	}

	public start(): void {
		this.middlewaresSetup.init(this.app);
		this.routesSetup.setup(this.app);

		const server = this.serverSetup.create(this.app, this.port);

		this.terminusSetup.setup(server);
	}
}
