// deno run --unstable --allow-read --allow-write tests/dummy-data.ts
import { emptyDir, path, walk } from "../deps.ts";

const snapraidPath = "/mnt/snapraid";
const prefix = "dummy-";
const extensions = [".mp3", ".mp4", ".mkv", ".txt"];

const allDisks = [...await allocateDisks("all")];
const dataDisks = [...await allocateDisks("disk")];
const parityDisks = [...await allocateDisks("parity")];

// type data = "disk";
// type parity = "parity";
type storage = "disk" | "parity" | "all";

console.log(allDisks);
console.log(parityDisks);
console.log(dataDisks);

async function allocateDisks(disk: storage) {
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
async function randomFile() {
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
    crypto.getRandomValues(new Uint8Array((Math.random() + 0.1) * 2 ** 16)),
  );
}

function createRandomFiles(amount: number) {
  return Promise.allSettled(
    Array(amount)
      .fill(0)
      .map((_) => randomFile()),
  );
}

function removeAllFiles() {
  for (const path of snapraidPath) {
    emptyDir(path);
  }
}

async function removeSomeRandomFiles(amount: number) {
  const files = [];

  for await (
    const entry of walk(snapraidPath, {
      // maxDepth: 1,
      includeDirs: false,
      includeFiles: true,
      match: [/disk/gi],
    })
  ) {
    files.push(entry.path);
  }

  const randomFiles = [
    ...files.sort(() => Math.random() - Math.random()).slice(0, amount),
  ];

  for (const file of randomFiles) {
    Deno.remove(file);
  }
}

function moveSomeFiles() {
}

function copySomeFiles() {
}

// await createRandomFiles(20);
removeAllFiles();
// removeSomeRandomFiles(30);
