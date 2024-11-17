import { ContainerModule, interfaces } from "inversify";

import { JwtAuth } from "../../middlewares/jwt";
import { Middlewares } from "../../middlewares";
import { AuthGuard } from "../../middlewares/guard";
import { App } from "../../app/app";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind(JwtAuth).toSelf();
	bind(AuthGuard).toSelf();
	bind(Middlewares).toSelf();
	bind(App).toSelf();
});
