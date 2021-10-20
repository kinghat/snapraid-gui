import {
  RouterContext,
  RouterMiddleware,
  Session,
  SqliteStore,
  Status,
} from "../../deps.ts";
// import { db } from "../db/db.ts";

// const store = new SqliteStore(db);

// use memory store until denodb integration: https://github.com/jcs224/oak_sessions/issues/8
// const store = new MemoryStore();

export const session = new Session();
export const authorize: RouterMiddleware = async (
  { request, response, state }: RouterContext,
  next,
) => {
  if (await state.session.get("userId")) {
    if (request.url.pathname.match(`/api/authenticate`)) {
      response.status = Status.Accepted;
      response.body = { message: `Authorized` };
    }
    await next();
  } else {
    response.status = Status.Unauthorized;
    response.body = { message: `Unauthorized` };
    // response.redirect(`/login`);
  }
};
