import express, { Express } from "express";

import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { injectable } from "inversify";

@injectable()
export class Middlewares {
	constructor() {}

	init(app: Express): void {
		app.use(compression());
		app.use(helmet());
		app.use(morgan("combined"));
		app.use(cors());
		app.use(express.urlencoded({ extended: true }));
		app.use(express.json());
		app.use(cookieParser());
	}
}

