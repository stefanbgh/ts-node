import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../db";
import { Role } from "../types/Role";

class User extends Model {
	public usr_id!: number;
	public usr_name!: string;
	public usr_email!: string;
	public usr_password!: string;
	public usr_verified!: boolean;
	public usr_role!: Role;
}

User.init(
	{
		usr_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		usr_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		usr_email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		usr_password: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		usr_verified: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
		usr_role: {
			type: DataTypes.ENUM("admin", "user"),
			defaultValue: "user",
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "users",
		timestamps: false,
	}
);

export default User;
