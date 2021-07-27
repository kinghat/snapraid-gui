import { move, path, walk } from "../../../deps.ts";
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
  const directories: string[] = [];

  for await (
    const entry of walk(mountPath, {
      includeDirs: true,
      includeFiles: true,
      match: [/disk/gi],
      skip: [/(content)|(parity)|(lost)/gi],
    })
  ) {
    if (entry.isDirectory) directories.push(entry.path);

    if (entry.isFile) files.push(entry.path);
  }

  if (amount > files.length) {
    console.log(
      `Specified files(${amount}) exceeds the amount of data files that exist. Rerun with an appropriate value.`,
    );
    return;
  }

  const randomFiles = [
    ...files.sort(() => Math.random() - Math.random()).slice(0, amount),
  ];
  // const randomizedDirectories = [
  //   ...directories.sort(() => Math.random() - Math.random()),
  // ];

  function pickRandomDirectory() {
    return directories[(Math.floor(Math.random() * directories.length))];
  }

  for await (const file of randomFiles) {
    let randomDirectory = pickRandomDirectory();

    while (path.dirname(file).includes(randomDirectory)) {
      randomDirectory = pickRandomDirectory();
    }

    move(file, `${randomDirectory}/${path.basename(file)}-copy`);

    console.log(
      `moved: ${file} to ${randomDirectory}/${path.basename(file)}-copy`,
    );
  }
}
