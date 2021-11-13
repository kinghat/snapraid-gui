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
  { request, response, state, cookies }: RouterContext,
  next,
) => {
  // const sessionId = await cookies.get(`session`);

  console.log("sessionIdResponse: ", response.headers);
  // console.log("sessionID: ", sessionId);
  console.log("sessionID: ", await state.sessionID);
  // console.log("session: ", await state.session.getSession(sessionId));
  // console.log(`sessionValid: ${await state.session.sessionValid(sessionId)}`);

  if (await state.session.get(`userId`)) {
    if (request.url.pathname.match(`/api/auth/authorize`)) {
      response.status = Status.Accepted;
      response.body = { message: `Authorized` };
    }
    await next();
  } else {
    response.status = Status.Unauthorized;
    response.body = { message: `Unauthorized` };
  }
};
