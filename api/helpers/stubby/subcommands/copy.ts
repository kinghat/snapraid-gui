import { copy, exists, path, walk } from "../../../deps.ts";
import { Subcommand } from "../deps.ts";

import { CopyAmountOption } from "../options/amount.ts";
import { SNAPRAID } from "../helpers.ts";

const { mountPath } = SNAPRAID;

export class CopySubcommand extends Subcommand {
  public signature = "copy";

  public description =
    "Copy an amount of random data files to random data disks.";

  public options = [CopyAmountOption];

  public async handle(): Promise<void> {
    const amountValue = this.getOptionValue("--amount");
    const amountAsNumber = Number(amountValue);

    if (amountValue === null) {
      copySomeRandomDataFiles();

      return;
    }

    if (isNaN(amountAsNumber)) {
      this.showHelp();

      return;
    }

    await copySomeRandomDataFiles(amountAsNumber);
  }
}

async function copySomeRandomDataFiles(amount = 10) {
  let count = 0;
  const filePaths: string[] = [];
  const diskPaths: string[] = [];

  for await (
    const entry of walk(mountPath, {
      includeDirs: true,
      includeFiles: true,
      match: [/disk/gi],
      skip: [/(content)|(parity)|(lost)/gi],
    })
  ) {
    if (entry.isDirectory) diskPaths.push(entry.path);

    if (entry.isFile) filePaths.push(entry.path);
  }

  if (amount > filePaths.length) {
    console.log(
      `Specified amount of files(${amount}) exceeds the amount of data files that exist.\nRerun with an appropriate value.`,
    );

    return;
  }

  const randomFilePaths = filePaths.sort(() => Math.random() - Math.random());
  // const randomFilePaths = [
  //   ...filePaths.sort(() => Math.random() - Math.random()).slice(0, amount),
  // ];

  const randomDiskPaths = diskPaths.sort(() => Math.random() - Math.random());

  // function selectRandomFilePath() {
  //   return filePaths[Math.floor(Math.random() * filePaths.length)];
  // }

  // function selectRandomDiskPath() {
  //   return diskPaths[Math.floor(Math.random() * diskPaths.length)];
  // }

  async function getWritableDiskPath(filePath: string) {
    const validatedDiskPaths = [];

    for (const diskPath of randomDiskPaths) {
      if (!await exists(`${diskPath}/${path.basename(filePath)}`)) {
        validatedDiskPaths.push(diskPath);
      }
    }

    if (validatedDiskPaths.length) {
      return validatedDiskPaths[
        Math.floor(Math.random() * validatedDiskPaths.length)
      ];
    }

    return undefined;
  }

  for (const filePath of randomFilePaths) {
    const diskPath = await getWritableDiskPath(filePath);

    if (diskPath) {
      await copy(filePath, `${diskPath}/${path.basename(filePath)}`);

      count++;
    }

    if (count === amount) break;
  }

  console.log(`copied ${count} files.`);
}
