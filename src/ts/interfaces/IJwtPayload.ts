import { JwtPayload } from "jsonwebtoken";

export interface IJwtPayload extends JwtPayload {
	usr_id: number;
	usr_name: string;
}
