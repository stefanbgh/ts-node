import { ContainerModule, interfaces } from "inversify";

import { JwtAuth } from "../../frameworks/middlewares/jwt";
import { AuthGuard } from "../../frameworks/middlewares/guard";
import { Middlewares } from "../../frameworks/middlewares";
import { App } from "../../app/app";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind(JwtAuth).toSelf();
	bind(AuthGuard).toSelf();
	bind(Middlewares).toSelf();
	bind(App).toSelf();
});
