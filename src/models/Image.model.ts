import { dbContainer } from "../containers/db.container";
import { Model, DataTypes } from "sequelize";
import { Database } from "../frameworks/db";

import User from "./User.model";

const database = dbContainer.get(Database);

class Image extends Model {
	public img_id!: number;
	public img_data!: Buffer;
	public usr_id!: number;
}

Image.init(
	{
		img_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		img_data: {
			type: DataTypes.BLOB("long"),
			allowNull: false,
		},
		usr_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: "usr_id",
			},
		},
	},
	{
		sequelize: database.sequelizeInstance,
		tableName: "images",
		timestamps: false,
	}
);

Image.belongsTo(User, { foreignKey: "usr_id" });

export default Image;
