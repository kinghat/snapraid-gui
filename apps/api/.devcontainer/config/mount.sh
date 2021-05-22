#!/bin/bash

sudo mount /mnt/loops/disk00.img /mnt/snapraid/disk00
sudo mount /mnt/loops/disk01.img /mnt/snapraid/disk01
sudo mount /mnt/loops/disk02.img /mnt/snapraid/disk02
sudo mount /mnt/loops/disk03.img /mnt/snapraid/disk03
sudo mount /mnt/loops/parity00.img /mnt/snapraid/parity00
sudo mount /mnt/loops/parity01.img /mnt/snapraid/parity01
sudo chown -R deno:deno /mnt/snapraid/disk*
run --allow-net --allow-unstable src/.server.ts

# CMD ["run", "--allow-net", "--unstable", "src/server.ts"]
