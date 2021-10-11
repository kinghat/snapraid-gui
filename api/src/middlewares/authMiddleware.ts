import { Session, SqliteStore } from "../../deps.ts";
import { db } from "../db/db.ts";

const store = new SqliteStore(db);

export const session = new Session(store);
