import { injectable } from "inversify";
import { Sequelize } from "sequelize";

import pg from "pg";
import dbConfig from "../../config/db.config";

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

	get sequelizeInstance(): Sequelize {
		return this.sequelize;
	}
}
