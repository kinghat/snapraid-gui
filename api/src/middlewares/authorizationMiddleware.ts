import {
  Middleware,
  Session,
  // SqliteStore,
  Status,
} from "../../deps.ts";
// import { db } from "../db/db.ts";

// const store = new SqliteStore(db);

// use memory store until denodb integration: https://github.com/jcs224/oak_sessions/issues/8
// const store = new MemoryStore();

export const session = new Session();
export const authorize: Middleware = async (
  { request, response, state },
  next,
) => {
  console.log("sessionIdResponse: ", response.headers);
  console.log("sessionID: ", await state.sessionID);

  if (await state.session.get(`userId`)) {
    if (request.url.pathname.match(`/api/auth/authorize`)) {
      response.status = Status.Accepted;
      response.body = { message: `authorized` };
    }
    await next();
  } else {
    response.status = Status.Unauthorized;
    response.body = { message: `unauthorized` };
  }
};
