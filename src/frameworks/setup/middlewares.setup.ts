import { Express } from "express";
import { injectable } from "inversify";
import { Middlewares } from "../middlewares"; 

@injectable()
export class MiddlewaresSetup {
    constructor(private middlewares: Middlewares) {}

    init(app: Express): void {
        this.middlewares.init(app);
    }
}
