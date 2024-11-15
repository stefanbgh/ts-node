import { LoginDTO } from "./LoginDTO";

export interface RegisterDTO extends LoginDTO {
    usr_name: string;
}