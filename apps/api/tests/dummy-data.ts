// deno run --unstable --allow-read --allow-write tests/dummy-data.ts
import { emptyDir, walkSync } from "../deps.ts";

const snapraidPath = "/mnt/snapraid";
// const diskPaths = [
//   "/mnt/snapraid/disk00/",
//   "/mnt/snapraid/disk01/",
//   "/mnt/snapraid/disk02/",
//   "/mnt/snapraid/disk03/",
// ];
const diskPaths = [];
const parityPaths = [];

const prefix = "dummy-";

const extensions = [".mp3", ".mp4", ".mkv", ".txt"];

async function randomFile() {
  const randomExtension = Math.floor(Math.random() * extensions.length);
  const randomPath = Math.floor(Math.random() * paths.length);
  const randomFilename = paths[randomPath] + prefix +
    Math.floor(Math.random() * 2 ** 32 + 2 ** 12).toString(32) +
    extensions[randomExtension];

  console.log(randomFilename);

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
  for (const path of paths) {
    emptyDir(path);
  }
}

async function removeSomeFiles() {
  for (const entry of walkSync(paths[0])) {
    console.log(entry);
  }
  for await (const dirEntry of Deno.readDir(paths[0])) {
    console.log(dirEntry);
  }
}

function moveSomeFiles() {
}

function copySomeFiles() {
}

// await createRandomFiles(20);
// removeAllFiles();
removeSomeFiles();
