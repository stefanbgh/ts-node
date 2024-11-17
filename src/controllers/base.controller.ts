import { UseBefore } from "routing-controllers";
import { AuthGuard } from "../middlewares/guard";

@UseBefore(AuthGuard)
export class BaseController {}