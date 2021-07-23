import { SubcommandOption } from "../deps.ts";

class AmountOption extends SubcommandOption {
  public name = "--amount";
}

export class CreateAmountOption extends AmountOption {
  public description = "Specify the amount of files to create.";
}

export class DeleteAmountOption extends AmountOption {
  public description = "Specify the amount of files to delete.";
}
