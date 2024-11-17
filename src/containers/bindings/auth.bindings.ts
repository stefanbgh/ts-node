import { ContainerModule, interfaces } from "inversify";

import { AuthService } from "../../services/auth.service";
import { AuthController } from "../../controllers/auth.controller";
import { AuthRoutes } from "../../routes/auth.routes";

export const authBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind(AuthRoutes).toSelf();
	bind(AuthController).toSelf();
	bind(AuthService).toSelf();
});