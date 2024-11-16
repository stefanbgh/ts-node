import { Model, DataTypes } from "sequelize";
import { Role } from "../ts/types/Role";
import { Database } from "../db";

import Roles from "./Role.model"; 

const database = new Database();

class User extends Model {
	public usr_id!: number;
	public usr_name!: string;
	public usr_email!: string;
	public usr_password!: string;
	public usr_verified!: boolean;
	public rol_id!: Role;
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
		rol_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
			  	model: Roles,
			  	key: "rol_id", 
			},
			defaultValue: 1,
		},
	},
	{
		sequelize: database.sequelizeInstance,
		tableName: "users",
		timestamps: false,
	}
);

User.belongsTo(Roles, { foreignKey: "rol_id" });

export default User;
