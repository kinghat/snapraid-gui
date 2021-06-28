#!/bin/bash

sudo mkdir -p /mnt/loops
sudo mkdir -p /mnt/snapraid/disk{00..03}
sudo mkdir -p /mnt/snapraid/parity{00..01}
sudo dd if=/dev/zero of=/mnt/loops/disk00.img bs=1 count=0 seek=200M
sudo dd if=/dev/zero of=/mnt/loops/disk01.img bs=1 count=0 seek=200M
sudo dd if=/dev/zero of=/mnt/loops/disk02.img bs=1 count=0 seek=200M
sudo dd if=/dev/zero of=/mnt/loops/disk03.img bs=1 count=0 seek=200M
sudo dd if=/dev/zero of=/mnt/loops/parity00.img bs=1 count=0 seek=250M
sudo dd if=/dev/zero of=/mnt/loops/parity01.img bs=1 count=0 seek=250M
sudo mkfs.ext4 -q /mnt/loops/disk00.img
sudo mkfs.ext4 -q /mnt/loops/disk01.img
sudo mkfs.ext4 -q /mnt/loops/disk02.img
sudo mkfs.ext4 -q /mnt/loops/disk03.img
sudo mkfs.ext4 -q /mnt/loops/parity00.img
sudo mkfs.ext4 -q /mnt/loops/parity01.img

sudo mount /mnt/loops/disk00.img /mnt/snapraid/disk00
sudo mount /mnt/loops/disk01.img /mnt/snapraid/disk01
sudo mount /mnt/loops/disk02.img /mnt/snapraid/disk02
sudo mount /mnt/loops/disk03.img /mnt/snapraid/disk03
sudo mount /mnt/loops/parity00.img /mnt/snapraid/parity00
sudo mount /mnt/loops/parity01.img /mnt/snapraid/parity01
sudo chown -R deno:deno /mnt/snapraid/disk*

set -e

case "$1" in
bundle | cache | compile | completions | coverage | doc | eval | fmt | help | info | install | lint | lsp | repl | run | test | types | upgrade)
  exec deno "$@"
  ;;
esac

exec "$@"
