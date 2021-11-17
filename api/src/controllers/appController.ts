import { Middleware, Status } from "../../deps.ts";
// import { session } from "../middlewares/authorizationMiddleware.ts";

export const home: Middleware = ({ response }) => {
  response.status = Status.OK;
  response.body = { message: `Success.` };
  // response.redirect(`/dashboard`);
};

export const dashboard: Middleware = ({ response }) => {
  response.status = Status.OK;
  response.body = { message: `Success.` };
};
