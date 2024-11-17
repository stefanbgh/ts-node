import { Request, Response, NextFunction } from "express";

import { JwtAuth } from "../jwt/index";
import { Middleware } from "routing-controllers";
import { appContainer } from "../../containers/app.container";
import { isProtectedRoutes } from "../../utils/helpers/isProtectedRoutes";
import { protectedRoutes } from "../../constants/protectedRoutes.constant";

@Middleware({ type: "before" })
export class AuthGuard {
    use(req: Request, res: Response, next: NextFunction) {
        

        const isProtected = isProtectedRoutes(req.path);

        console.log(protectedRoutes);
        console.log(req.path);
        console.log(isProtected);

        if (!isProtected) {
            return next();
        }

        const jwtAuth = appContainer.get(JwtAuth);
        jwtAuth.authenticate(req, res, next);
    }
}