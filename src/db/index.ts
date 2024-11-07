import { Sequelize } from "sequelize";

import pg from "pg";
import dbConfig from "../config/index";

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
		console.log("Successfully connected to DB");
		await sequelize.sync();
	} catch (error) {
		console.log(error);
	}
};

export { sequelize, connectToDb };
