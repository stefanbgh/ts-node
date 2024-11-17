import { ContainerModule, interfaces } from "inversify";

import { UserRoutes } from "../../routes/user.routes";
import { UserController } from "../../controllers/user.controller";
import { UserService } from "../../services/user.service";
import { UserRepository } from "../../repositories/user.repository";

export const userBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind(UserRoutes).toSelf();
	bind(UserController).toSelf();
	bind(UserService).toSelf();
	bind(UserRepository).toSelf();
})