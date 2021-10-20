import { Router } from "../../deps.ts";
import { authorize, session } from "../middlewares/authorizationMiddleware.ts";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.ts";
import { home } from "../controllers/appController.ts";

const authenticationRouter = new Router().prefix(`/api/authenticate`);

authenticationRouter
  .post("/", session.initMiddleware(), authorize, home)
  .post("/register", registerUser)
  .post("/login", session.initMiddleware(), loginUser)
  .post("/logout", session.initMiddleware(), logoutUser);

export default authenticationRouter;