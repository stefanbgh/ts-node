import { Container } from "inversify";

import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { ImageRepository } from "../repositories/image.repository";
import { ImageService } from "../services/image.service";
import { ImageController } from "../controllers/image.controller";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";
import { JwtAuth } from "../middlewares/jwt";

import { TYPES } from "./types.config";

const container = new Container();

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<ImageRepository>(TYPES.ImageRepository).to(ImageRepository);
container.bind<ImageService>(TYPES.ImageService).to(ImageService);
container.bind<ImageController>(TYPES.ImageController).to(ImageController);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<JwtAuth>(TYPES.JwtAuth).to(JwtAuth);

export { container };
