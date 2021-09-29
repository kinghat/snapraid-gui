import { Database, SQLite3Connector } from "../../deps.ts";

const connector = new SQLite3Connector({
  filepath: "/db/snapraid.sqlite",
});

import { DataTypes, Model } from "../../deps.ts";

export class User extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  };
}

interface UserType {
  id: string;
  username: string;
  password: string;
}

export const db = new Database(connector).link(
  [User],
);
