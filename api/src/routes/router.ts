import { Router } from "../../deps.ts";
import authenticationRouter from "./authenticationRoutes.ts";
import snapraidRouter from "./snapraidRoutes.ts";
import appRouter from "./appRoutes.ts";
const router = new Router();

router
  .use(authenticationRouter.routes())
  .use(appRouter.routes())
  .use(snapraidRouter.routes());

export default router;
