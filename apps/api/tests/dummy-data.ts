const paths = [
  "/mnt/snapraid/disk00/",
  "/mnt/snapraid/disk01/",
  "/mnt/snapraid/disk02/",
  "/mnt/snapraid/disk03/",
];

const extensions = [".mp3", ".mp4", ".mkv", ".txt"];

async function randomFile() {
  const randomExtension = Math.floor(Math.random() * extensions.length);
  const randomPath = Math.floor(Math.random() * paths.length);
  // const randomFilename = `${paths[randomPath]}${
  //   Math.floor(Math.random() * 2 ** 32 + 2 ** 12).toString(32)
  // }${extensions[randomExtension]}`;
  const randomFilename = paths[randomPath] +
    Math.floor(Math.random() * 2 ** 32 + 2 ** 12).toString(32) +
    extensions[randomExtension];

  console.log(randomFilename);

  await Deno.writeFile(
    randomFilename,
    crypto.getRandomValues(new Uint8Array((Math.random() + 0.1) * 2 ** 16)),
  );
}

function randomFiles(amount: number) {
  return Promise.allSettled(
    Array(amount)
      .fill(0)
      .map((_) => randomFile()),
  );
}

await randomFiles(20);
