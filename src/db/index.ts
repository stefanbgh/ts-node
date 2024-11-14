import { Sequelize } from "sequelize";

import pg from "pg";
import dbConfig from "../config/db.config";

import { logger } from "../utils/logger";

const { host, username, password, database, port } = dbConfig;

const sequelize = new Sequelize({
	dialect: "postgres",
	host,
	username,
	password,
	database,
	port,
	dialectModule: pg,
});

const connectToDb = async () => {
	try {
		await sequelize.authenticate();
		logger.info("Successfully connected to DB");
		await sequelize.sync();
	} catch (error) {
		logger.error(`Error connecting to DB: ${error}`);
	}
};

export { sequelize, connectToDb };
