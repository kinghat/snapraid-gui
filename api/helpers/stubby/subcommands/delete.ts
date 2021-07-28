import { emptyDir, walk } from "../../../deps.ts";
import { Subcommand } from "../deps.ts";

import { DeleteAmountOption } from "../options/amount.ts";
import { SNAPRAID } from "../helpers.ts";

const { mountPath } = SNAPRAID;

export class DeleteSubcommand extends Subcommand {
  public signature = "delete";

  public description =
    "Remove any amount of random data files or remove all data files.";

  public options = [DeleteAmountOption];

  public handle(): void {
    const amountValue = this.getOptionValue("--amount");
    const amountAsNumber = Number(amountValue);

    if (amountValue === "all") {
      removeAllDataFiles().catch((error) => console.log(error));

      return;
    }

    if (amountAsNumber) {
      removeSomeRandomDataFiles(amountAsNumber).catch((error) =>
        console.log(error)
      );

      return;
    }

    console.log(
      `The passed value: "${amountValue}" is not recognized.\nFIX IT OR IM GETTING A LAWYER!\n`,
    );

    this.showHelp();
  }
}

async function removeAllDataFiles() {
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

async function removeSomeRandomDataFiles(amount: number) {
  let count = 0;
  const files = [];

  for await (
    const entry of walk(mountPath, {
      includeDirs: false,
      includeFiles: true,
      match: [/disk/gi],
      skip: [/(content)|(parity)/gi],
    })
  ) {
    files.push(entry.path);

    // console.log(entry.path);
  }

  const randomFiles = [
    ...files.sort(() => Math.random() - Math.random()).slice(0, amount),
  ];

  console.log(randomFiles);

  for (const file of randomFiles) {
    Deno.remove(file);

    // console.log(file);

    count++;
  }

  console.log(`removed ${count} files!`);
}
