import { ContainerModule, interfaces } from "inversify";

import { Database } from "../../frameworks/db";

export const dbBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind(Database).toSelf();
})