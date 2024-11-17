import { Request, Response, NextFunction } from "express";

import { JwtAuth } from "../jwt/index";
import { appContainer } from "../../containers/app.container";
import { Middleware } from "routing-controllers";

@Middleware({ type: "before" })
export class AuthGuard {
    use(req: Request, res: Response, next: NextFunction) {
        const jwtAuth = appContainer.get(JwtAuth);
        jwtAuth.authenticate(req, res, next);
    }
}