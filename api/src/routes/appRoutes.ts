import { Router } from "../../deps.ts";
import { authorize, session } from "../middlewares/authorizationMiddleware.ts";
import { setup } from "../controllers/appController.ts";

const appRouter = new Router().prefix("/api").use(
  session.initMiddleware(),
  // authorize,
);

appRouter
  .get("/setup", setup);

export default appRouter;
