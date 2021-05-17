
FROM mcr.microsoft.com/vscode/devcontainers/base:debian-10

ENV DENO_INSTALL=/deno
RUN mkdir -p /deno \
  && curl -fsSL https://deno.land/x/install/install.sh | sh \
  && chown -R vscode /deno

ENV PATH=${DENO_INSTALL}/bin:${PATH} \
  DENO_DIR=${DENO_INSTALL}/.cache/deno

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#    && apt-get -y install --no-install-recommends <your-package-list-here>

SHELL ["/bin/bash", "-c"]

RUN mkdir -p /loops \
  && mkdir -p /mnt/snapraid/disk{00..03} \
  && mkdir -p /mnt/snapraid/parity{00..01} \
  && dd if=/dev/zero of=/loops/disk00.img bs=1 count=0 seek=200M \
  && dd if=/dev/zero of=/loops/disk01.img bs=1 count=0 seek=200M \
  && dd if=/dev/zero of=/loops/disk02.img bs=1 count=0 seek=200M \
  && dd if=/dev/zero of=/loops/disk03.img bs=1 count=0 seek=200M \
  && dd if=/dev/zero of=/loops/parity00.img bs=1 count=0 seek=250M \
  && dd if=/dev/zero of=/loops/parity01.img bs=1 count=0 seek=250M \
  && mkfs.ext4 -q /loops/disk00.img \
  && mkfs.ext4 -q /loops/disk01.img \
  && mkfs.ext4 -q /loops/disk02.img \
  && mkfs.ext4 -q /loops/disk03.img \
  && mkfs.ext4 -q /loops/parity00.img \
  && mkfs.ext4 -q /loops/parity01.img \
  && mount /loops/disk00.img /mnt/snapraid/disk00 \
  && mount /loops/disk01.img /mnt/snapraid/disk01 \
  && mount /loops/disk02.img /mnt/snapraid/disk02 \
  && mount /loops/disk03.img /mnt/snapraid/disk03 \
  && mount /loops/parity00.img /mnt/snapraid/parity00 \
  && mount /loops/parity01.img /mnt/snapraid/parity01

COPY deps.ts .
RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD src ./src
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache src/server.ts

# CMD ["run", "--allow-net", "src/server.ts"]
