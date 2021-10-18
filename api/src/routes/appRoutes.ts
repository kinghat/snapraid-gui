import { Router } from "../../deps.ts";
import { authorize, session } from "../middlewares/authorizationMiddleware.ts";
import { dashboard, home } from "../controllers/appController.ts";

const appRouter = new Router().prefix("/api").use(
  session.initMiddleware(),
  authorize,
);

appRouter
  .post("/", session.initMiddleware(), home)
  .post("/dashboard", session.initMiddleware(), authorize, dashboard);

export default appRouter;
