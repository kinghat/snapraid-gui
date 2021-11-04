import { Router } from "../../deps.ts";
import { authorize, session } from "../middlewares/authorizationMiddleware.ts";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.ts";
import { home } from "../controllers/appController.ts";

const authenticationRouter = new Router().prefix(`/api/auth`);

authenticationRouter
  .post("/authorize", session.initMiddleware(), authorize)
  // .post("/authorize", session.initMiddleware(), authorize)
  .post("/register", registerUser)
  .post("/login", session.initMiddleware(), loginUser)
  .post("/logout", logoutUser);

export default authenticationRouter;
