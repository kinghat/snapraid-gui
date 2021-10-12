import { Session, SqliteStore } from "../../deps.ts";
// import { db } from "../db/db.ts";

// const store = new SqliteStore(db);

// export const session = new Session(store);

// use memory store until denodb integration: https://github.com/jcs224/oak_sessions/issues/8
export const session = new Session();
