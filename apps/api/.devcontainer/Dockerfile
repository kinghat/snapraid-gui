FROM hayd/alpine-deno:1.10.1

RUN apk --update add python3 git smartmontools tzdata && \
    apk add snapraid --update-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing --allow-untrusted && \
    # git clone https://github.com/Chronial/snapraid-runner.git /app/snapraid-runner && \
    # chmod +x /app/snapraid-runner/snapraid-runner.py && \
    rm -rf /var/cache/apk/*

# RUN echo '0 3 * * * /usr/bin/python3 /app/snapraid-runner/snapraid-runner.py -c /config/snapraid-runner.conf' > /etc/crontabs/root

# VOLUME /config

# COPY docker/docker-entry.sh  /
# RUN chmod 755 /docker-entry.sh

# RUN ["/docker-entry.sh"]

RUN apk add --no-cache util-linux e2fsprogs bash

SHELL ["/bin/bash", "-c"]

RUN mkdir -p /loops \
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
    && mkdir -p /mnt/snapraid/{disk00,disk01,disk02,disk03} \
    && mkdir -p /mnt/snapraid/{parity00,parity01} \
    && mount /loops/disk00.img /mnt/snapraid/disk00 \
    && mount /loops/disk01.img /mnt/snapraid/disk01 \
    && mount /loops/disk02.img /mnt/snapraid/disk02 \
    && mount /loops/disk03.img /mnt/snapraid/disk03 \
    && mount /loops/parity00.img /mnt/snapraid/parity00 \
    && mount /loops/parity01.img /mnt/snapraid/parity01
# && mount -o loop=/dev/disk00 /loops/disk00.img /mnt/snapraid/disk00 \
# && mount -o loop=/dev/disk01 /loops/disk01.img /mnt/snapraid/disk01 \
# && mount -o loop=/dev/disk02 /loops/disk02.img /mnt/snapraid/disk02 \
# && mount -o loop=/dev/disk03 /loops/disk03.img /mnt/snapraid/disk03 \
# && mount -o loop=/dev/parity00 /loops/parity00.img /mnt/snapraid/parity00 \
# && mount -o loop=/dev/parity01 /loops/parity01.img /mnt/snapraid/parity01
# && echo ls -lhs /loops/disk00.img \

COPY .devcontainer/config/snapraid.conf /etc

# The port that your application listens to.
EXPOSE 8080 

WORKDIR /app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally fetch deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD src ./src
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache src/server.ts

# CMD ["run", "--allow-net", "src/server.ts"]