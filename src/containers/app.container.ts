import { Container } from "inversify";

import { setupBindings } from "./bindings/setup.bindings";
import { authBindings } from "./bindings/auth.bindings";
import { userBindings } from "./bindings/user.bindings";
import { imageBindings } from "./bindings/image.bindings";
import { notFoundBindings } from "./bindings/notFound.bindings";
import { appBindings } from "./bindings/app.bindings";

const appContainer = new Container();

appContainer.load(
    setupBindings,
    userBindings,
    imageBindings,
    authBindings,
    notFoundBindings,
    appBindings
);

export { appContainer };
