import { Router } from "../../deps.ts";
import { authorize, session } from "../middlewares/authorizationMiddleware.ts";
import { login, logout, register } from "../controllers/userController.ts";
// import { home } from "../controllers/appController.ts";

const authenticationRouter = new Router().prefix(`/api/auth`);

authenticationRouter
  .post("/authorize", session.initMiddleware(), authorize)
  // .post("/authorize", authorize)
  .post("/register", register)
  .post("/login", session.initMiddleware(), login)
  // .post("/logout", logout);
  .post("/logout", session.initMiddleware(), logout);

export default authenticationRouter;
