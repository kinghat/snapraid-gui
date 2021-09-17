import { Router } from "../../deps.ts";
import authRouter from "./authRoutes.ts";
import snapraidRouter from "./snapraidRoutes.ts";

const router = new Router();
authRouter.routes();
snapraidRouter.routes();
// snapraidRouter.prefix("/api/snapraid").routes();

export default router;
