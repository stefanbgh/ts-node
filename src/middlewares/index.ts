import express, { RequestHandler } from "express";
import { injectable } from "inversify";

import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimiter from "../utils/rateLimiter";

@injectable()
export class Middlewares {
	constructor() {}

	init(): Array<RequestHandler> {
		return [
		  rateLimiter,
		  compression(),
		  helmet(),
		  morgan("combined"),
		  cors(),
		  express.urlencoded({ extended: true }),
		  express.json(),
		  cookieParser(),
		];
	  }
}

