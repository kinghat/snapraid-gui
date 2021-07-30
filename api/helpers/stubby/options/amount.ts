import { SubcommandOption } from "../deps.ts";

class AmountOption extends SubcommandOption {
  public name = "--amount";
}

export class CreateAmountOption extends AmountOption {
  public description = "Specify the amount of random data files to create.";
}

export class DeleteAmountOption extends AmountOption {
  public description = "Specify the amount of random data files to delete.";
}

export class MoveAmountOption extends AmountOption {
  public description = "Specify the amount of random data files to move.";
}

export class CopyAmountOption extends AmountOption {
  public description = "Specify the amount of random data files to move.";
}
