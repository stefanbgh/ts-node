import winston from "winston";

export const logger = winston.createLogger({
	level: "info",
	transports: [
		new winston.transports.Console({ format: winston.format.simple() }),
		new winston.transports.File({ filename: "app.log" }),
	],
});