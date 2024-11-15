import { Model, DataTypes } from "sequelize";
import { Role } from "../ts/types/Role";
import { Database } from "../db";
import { ERole } from "../ts/enums/ERole";

const database = new Database();

class Roles extends Model {
	public rol_id!: number;
	public rol_name!: Role;
}

Roles.init(
	{
		rol_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		rol_name: {
			type: DataTypes.ENUM(ERole.USER, ERole.ADMIN),
            defaultValue: ERole.USER,
			allowNull: false,
		},
	},
	{
		sequelize: database.getSequelize(),
		tableName: "images",
		timestamps: false,
	}
);

export default Roles;