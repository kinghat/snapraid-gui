import { Router } from "../../deps.ts";
import { authorize, session } from "../middlewares/authorizationMiddleware.ts";
import { dashboard } from "../controllers/appController.ts";

const appRouter = new Router().prefix("/api").use(
  session.initMiddleware(),
  authorize,
);

appRouter
  .post("/dashboard", dashboard);

export default appRouter;
