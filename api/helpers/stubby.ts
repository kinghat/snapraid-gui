// deno run --unstable --allow-read --allow-write helpers/stubby.ts
import { emptyDir, parse, path, walk } from "../deps.ts";
import Denomander from "https://deno.land/x/denomander@0.8.2/mod.ts";

const snapraidPath = "/mnt/snapraid";
const prefix = "dummy-";
const extensions = [".mp3", ".mp4", ".mkv", ".txt"];
const allDisks = [...(await allocateDisks("all"))];
const dataDisks = [...(await allocateDisks("disk"))];
const parityDisks = [...(await allocateDisks("parity"))];

interface Disk {
  name: string;
  path: string;
}

// interface Parity {
//   name:
// }

type Storage = "disk" | "parity" | "all";

const stubbyCLI = new Denomander({
  app_name: "stubby",
  app_description:
    "for scaffolding and management of data files to aid in the development of snapraid-gui",
  app_version: "1.0.0",
});

stubbyCLI.command("print", "print all the files", printDataFiles);
stubbyCLI.command(
  "create [numberOfFiles]",
  "create random files on the data disks",
).action(({ numberOfFiles }: number) => createRandomFiles(numberOfFiles));

stubbyCLI.parse(Deno.args);

async function allocateDisks(disk: Storage) {
  const disks = [];

  for await (const dirEntry of Deno.readDir(snapraidPath)) {
    if (dirEntry.name.includes(disk)) {
      disks.push(dirEntry.name);
    }
    if (disk == "all") {
      disks.push(dirEntry.name);
    }
  }
  return disks;
}

async function printDataFiles() {
  let count = 0;
  const dataDiskPaths = dataDisks.map((disk) => path.join(snapraidPath, disk));

  for (const diskPath of dataDiskPaths) {
    for await (
      const entry of walk(diskPath, {
        includeDirs: false,
        includeFiles: true,
        match: [/disk/gi],
        skip: [/.content/gi],
      })
    ) {
      count++;
      console.log(entry);
    }
  }
  console.log(`${count} files.`);
}

async function writeRandomDataFile() {
  const randomExtension = Math.floor(Math.random() * extensions.length);
  const randomDisk = Math.floor(Math.random() * dataDisks.length);
  const randomFilename = path.join(
    snapraidPath,
    dataDisks[randomDisk],
    prefix +
      Math.floor(Math.random() * 2 ** 32 + 2 ** 12).toString(32) +
      extensions[randomExtension],
  );

  await Deno.writeFile(
    randomFilename,
    crypto.getRandomValues(new Uint8Array((Math.random() + 0.1) * 2 ** 14)),
  );

  console.log(randomFilename);
}

async function createRandomFiles(amount: number) {
  await Promise.allSettled(
    Array(amount)
      .fill(0)
      .map((_) => writeRandomDataFile()),
  );

  // for (let number = 0; number < amount; number++) {
  //   await writeRandomFile();
  // }

  console.log(`created ${amount} files.`);
}

async function removeAllFiles() {
  for await (
    const directory of walk(snapraidPath, {
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
    const entry of walk(snapraidPath, {
      // maxDepth: 1,
      includeDirs: false,
      includeFiles: true,
      match: [/disk/gi],
      skip: [/.content/gi],
    })
  ) {
    files.push(entry.path);
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

function moveSomeFiles() {}

function copySomeFiles() {}

// await createRandomFiles(10);
// await removeAllFiles();
// await removeSomeRandomFiles(13);
// await printDataFiles();
