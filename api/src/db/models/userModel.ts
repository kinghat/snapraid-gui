import { DataTypes, Model } from "../../../deps.ts";

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
