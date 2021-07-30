import { copy, path, walk } from "../../../deps.ts";
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
    const amountValue = this.getOptionValue("--amount");
    const amountAsNumber = Number(amountValue);

    if (amountValue === null) {
      moveSomeRandomDataFiles();

      return;
    }

    if (isNaN(amountAsNumber)) {
      this.showHelp();

      return;
    }

    await moveSomeRandomDataFiles(amountAsNumber);
  }
}

async function moveSomeRandomDataFiles(amount = 10) {
  let count = 0;
  const files: string[] = [];
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
      `Specified amount of files(${amount}) exceeds the amount of data files that exist.\nRerun with an appropriate value.`,
    );

    return;
  }

  const randomFiles = [
    ...files.sort(() => Math.random() - Math.random()).slice(0, amount),
  ];

  function pickRandomDirectory() {
    return directories[Math.floor(Math.random() * directories.length)];
  }

  for (const file of randomFiles) {
    let randomDirectory = pickRandomDirectory();

    while (path.dirname(file).includes(randomDirectory)) {
      randomDirectory = pickRandomDirectory();
    }

    // std/fs/move currently doesnt move across mounts/devices. substituted copy and Deno.remove until fixed in deno:
    // https://github.com/denoland/deno_std/issues/1070

    // move(file, `${randomDirectory}/${path.basename(file)}`);

    await copy(file, `${randomDirectory}/${path.basename(file)}`);

    await Deno.remove(file);

    count++;
  }

  console.log(`moved ${count} files.`);
}
