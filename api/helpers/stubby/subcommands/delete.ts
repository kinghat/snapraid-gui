import { emptyDir, walk } from "../../../deps.ts";
import { Subcommand } from "../deps.ts";

import { AmountOption } from "../options/amount.ts";
import { SNAPRAID } from "../helpers.ts";

const { mountPath } = SNAPRAID;

class DeleteAmountOption extends AmountOption {
  public description = "Specify the amount of files to delete.";
}

export class DeleteSubcommand extends Subcommand {
  public signature = "delete";

  public description =
    "Remove any amount of random data files or remove all data files.";

  public options = [DeleteAmountOption];

  public handle(): void {
    const amount = this.getOptionValue("--amount");
    if (!amount) {
      this.showHelp();
      return;
    }
    removeSomeRandomFiles(Number(amount));
  }
}

async function removeAllFiles() {
  for await (
    const directory of walk(mountPath, {
      maxDepth: 1,
      includeDirs: true,
      includeFiles: false,
      match: [/disk/gi],
    })
  ) {
    await emptyDir(directory.path);
  }

  console.log(`removed all files!`);
}

async function removeSomeRandomFiles(amount: number) {
  let count = 0;
  const files = [];

  for await (
    const entry of walk(mountPath, {
      // maxDepth: 1,
      includeDirs: false,
      includeFiles: true,
      match: [/disk/gi],
      skip: [/.content/gi],
    })
  ) {
    files.push(entry.path);
    console.log(entry.name);
  }

  const randomFiles = [
    ...files.sort(() => Math.random() - Math.random()).slice(0, amount),
  ];

  for (const file of randomFiles) {
    Deno.remove(file);
    console.log(file);
    count++;
  }

  console.log(`removed ${count} files!`);
}
