import { move, walk } from "../../../deps.ts";
import { Subcommand } from "../deps.ts";

import { MoveAmountOption } from "../options/amount.ts";
import { SNAPRAID } from "../helpers.ts";

const { mountPath } = SNAPRAID;

export class MoveSubcommand extends Subcommand {
  public signature = "move";

  public description =
    "Move an amount of random data files to random data disks.";

  public options = [MoveAmountOption];

  public async handle(): Promise<void> {
    const amountValue = this.getArgumentValue("--amount");
    const amountAsNumber = Number(amountValue);

    // if (!amountAsNumber) {
    //   this.showHelp();
    //   return;
    // }

    await moveSomeRandomDataFiles();
  }
}

async function moveSomeRandomDataFiles(amount = 10) {
  // let count = 0;
  // const filesAndDirectories = [];
  const files = [];
  const directories = [];

  for await (
    const entry of walk(mountPath, {
      includeDirs: true,
      includeFiles: true,
      match: [/disk/gi],
      skip: [/(content)|(parity)|(lost)/gi],
    })
  ) {
    // filesAndDirectories.push(entry);
    if (entry.isDirectory) directories.push(entry.path);
    if (entry.isFile) files.push(entry.path);

    // console.log(entry);
  }

  if (amount > files.length) {
    console.log(
      `Specified files(${amount}) exceeds the amount of data files that exist. Rerun with an appropriate value.`,
    );
    return;
  }

  // console.log(files);
  // console.log(directories);

  const randomFiles = [
    ...files.sort(() => Math.random() - Math.random()).slice(0, amount),
  ];
  const randomizedDirectories = [
    ...directories.sort(() => Math.random() - Math.random()),
  ];

  console.log(randomFiles);
  console.log(randomizedDirectories);

  // for (const file of randomFiles) {
  //   Deno.remove(file);

  //   // console.log(file);

  //   count++;
  // }

  // console.log(`removed ${count} files!`);
}
