import { Router } from "../../deps.ts";
import { authorize, session } from "../middlewares/authorizationMiddleware.ts";
import { dashboard, root } from "../controllers/appController.ts";

const appRouter = new Router();

appRouter
  .get("/", session.initMiddleware(), authorize, root)
  .post("/dashboard", session.initMiddleware(), authorize, dashboard);

export default appRouter;
