import { Container } from "inversify";

import { dbBindings } from "./bindings/db.bindings";

const dbContainer = new Container();
dbContainer.load(dbBindings);

export { dbContainer };