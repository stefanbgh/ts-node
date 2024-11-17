import { ContainerModule, interfaces } from "inversify";

import { UserController } from "../../controllers/user.controller";
import { UserService } from "../../services/user.service";
import { UserRepository } from "../../repositories/user.repository";

export const userBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind(UserController).toSelf();
	bind(UserService).toSelf();
	bind(UserRepository).toSelf();
})