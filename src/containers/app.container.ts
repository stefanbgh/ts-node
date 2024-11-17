import { Container } from "inversify";

import { appBindings } from "./bindings/app.bindings";
import { authBindings } from "./bindings/auth.bindings";
import { userBindings } from "./bindings/user.bindings";
import { imageBindings } from "./bindings/image.bindings";
import { notFoundBindings } from "./bindings/notFound.bindings";
import { dbBindings } from "./bindings/db.bindings";

const appContainer = new Container();

appContainer.load(
    dbBindings,
    authBindings,
    userBindings,
    imageBindings,
    notFoundBindings,
    appBindings
);

export { appContainer };
