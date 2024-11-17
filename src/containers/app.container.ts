import { Container } from "inversify";
import { appBindings } from "./bindings/app.bindings";

const appContainer = new Container();
appContainer.load(appBindings);

export { appContainer };
