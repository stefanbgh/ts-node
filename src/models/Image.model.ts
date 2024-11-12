import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";

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
				model: "users",
				key: "usr_id",
			},
		},
	},
	{
		sequelize,
		tableName: "images",
		timestamps: false,
	}
);

export default Image;
