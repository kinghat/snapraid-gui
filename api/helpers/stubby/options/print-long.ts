import { SubcommandOption } from "../deps.ts";

export class LongOption extends SubcommandOption {
  public name = "--long";
  public description = "Long list the files.";
}
