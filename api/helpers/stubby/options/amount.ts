import { SubcommandOption } from "../deps.ts";

export class AmountOption extends SubcommandOption {
  public name = "--amount";
  public description = "Specify the amount of files to create.";
}
