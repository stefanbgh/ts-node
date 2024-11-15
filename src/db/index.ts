import { Sequelize } from "sequelize";
import { logger } from "../utils/logger";
import { injectable } from "inversify";

import pg from "pg";
import dbConfig from "../config/db.config";

@injectable()
export class Database {
	private sequelize: Sequelize;

	constructor() {
		const { host, username, password, database, port } = dbConfig;

		this.sequelize = new Sequelize({
			dialect: "postgres",
			host,
			username,
			password,
			database,
			port,
			dialectModule: pg,
		});
	}

	public async connectToDb(): Promise<void> {
		try {
			await this.sequelize.authenticate();
			logger.info("Successfully connected to DB");
			await this.sequelize.sync();
		} catch (error) {
			logger.error(`Error connecting to DB: ${error}`);
		}
	}

	public getSequelize(): Sequelize {
		return this.sequelize;
	}
}
