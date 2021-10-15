import { Router } from "../../deps.ts";
import authenticationRouter from "./authenticationRoutes.ts";
import snapraidRouter from "./snapraidRoutes.ts";

const router = new Router();

router
  .use(authenticationRouter.routes())
  .use(snapraidRouter.routes());

export default router;
