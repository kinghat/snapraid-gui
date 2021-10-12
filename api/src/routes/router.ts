import { Router } from "../../deps.ts";
import authRouter from "./authRoutes.ts";
import snapraidRouter from "./snapraidRoutes.ts";

const router = new Router();
router
  .use(authRouter.routes())
  .use(snapraidRouter.routes());
// snapraidRouter.routes();
// snapraidRouter.prefix("/api/snapraid").routes();

export default router;
