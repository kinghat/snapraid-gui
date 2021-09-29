import { Database, SQLite3Connector } from "../../deps.ts";
import { User } from "./models/userModel.ts";

const connector = new SQLite3Connector({
  filepath: "/db/snapraid.sqlite",
});

export const db = new Database(connector).link(
  [User],
);
