import { ContainerModule, interfaces } from "inversify";

import { AuthService } from "../../services/auth.service";
import { AuthController } from "../../controllers/auth.controller";

export const authBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind(AuthController).toSelf();
	bind(AuthService).toSelf();
});