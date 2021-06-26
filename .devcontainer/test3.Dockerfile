FROM denoland/deno:alpine

RUN apk --update add python3 git smartmontools tzdata util-linux e2fsprogs bash \
  && apk add snapraid --update-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing --allow-untrusted \
  # && git clone https://github.com/Chronial/snapraid-runner.git /app/snapraid-runner \
  # && chmod +x /app/snapraid-runner/snapraid-runner.py \
  && rm -rf /var/cache/apk/*

# RUN echo '0 3 * * * /usr/bin/python3 /app/snapraid-runner/snapraid-runner.py -c /config/snapraid-runner.conf' > /etc/crontabs/root

SHELL ["/bin/bash", "-c"]

RUN mkdir -p /mnt/loops \
  && mkdir -p /mnt/snapraid/disk{00..03} \
  && mkdir -p /mnt/snapraid/parity{00..01} \
  && dd if=/dev/zero of=/mnt/loops/disk00.img bs=1 count=0 seek=200M \
  && dd if=/dev/zero of=/mnt/loops/disk01.img bs=1 count=0 seek=200M \
  && dd if=/dev/zero of=/mnt/loops/disk02.img bs=1 count=0 seek=200M \
  && dd if=/dev/zero of=/mnt/loops/disk03.img bs=1 count=0 seek=200M \
  && dd if=/dev/zero of=/mnt/loops/parity00.img bs=1 count=0 seek=250M \
  && dd if=/dev/zero of=/mnt/loops/parity01.img bs=1 count=0 seek=250M \
  && mkfs.ext4 -q /mnt/loops/disk00.img \
  && mkfs.ext4 -q /mnt/loops/disk01.img \
  && mkfs.ext4 -q /mnt/loops/disk02.img \
  && mkfs.ext4 -q /mnt/loops/disk03.img \
  && mkfs.ext4 -q /mnt/loops/parity00.img \
  && mkfs.ext4 -q /mnt/loops/parity01.img

COPY ./config/_mounting.sh /usr/local/bin/mounting.sh
RUN chmod 755 /usr/local/bin/mounting.sh
COPY ./config/snapraid.conf /etc

WORKDIR /workspace

USER deno

ENTRYPOINT [ "mounting.sh" ]
CMD ["run", "--unstable", "--watch", "--allow-net", "api/src/server.ts"]
