import { UseBefore } from "routing-controllers";
import { AuthGuard } from "../frameworks/middlewares/guard";

@UseBefore(AuthGuard)
export class BaseController {}