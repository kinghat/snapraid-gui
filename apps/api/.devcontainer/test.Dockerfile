FROM frolvlad/alpine-glibc

ENV DENO_VERSION=1.10.1

RUN apk add --virtual .download --no-cache curl \
  && curl -fsSL https://github.com/denoland/deno/releases/download/v${DENO_VERSION}/deno-x86_64-unknown-linux-gnu.zip \
  --output deno.zip \
  && unzip deno.zip \
  && rm deno.zip \
  && chmod 755 deno \
  && mv deno /bin/deno \
  && apk del .download

RUN addgroup deno \
  && adduser --disabled-password deno --ingroup deno\
  && mkdir /deno-dir/ \
  && chown deno:deno /deno-dir/

ENV DENO_DIR /deno-dir/
ENV DENO_INSTALL_ROOT /usr/local

COPY .devcontainer/config/_entry.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod 755 /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

# REMOVE ASAP (this is due to dynamic link in deno 1.8.0)
# https://github.com/denoland/deno/issues/9686
# RUN apk add libstdc++

RUN apk --update add python3 git smartmontools tzdata \
  && apk add snapraid --update-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing --allow-untrusted \
  # && git clone https://github.com/Chronial/snapraid-runner.git /app/snapraid-runner \
  # && chmod +x /app/snapraid-runner/snapraid-runner.py \
  && rm -rf /var/cache/apk/*

# RUN echo '0 3 * * * /usr/bin/python3 /app/snapraid-runner/snapraid-runner.py -c /config/snapraid-runner.conf' > /etc/crontabs/root

# VOLUME /config

# COPY docker/docker-entry.sh  /
# RUN chmod 755 /docker-entry.sh

# RUN ["/docker-entry.sh"]

COPY .devcontainer/config/snapraid.conf /etc

EXPOSE 8080 

WORKDIR /app

USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally fetch deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
# RUN chmod 755 deps.ts
RUN deno cache deps.ts
# These steps will be re-run upon each file change in your working directory:
ADD src ./src
# RUN chmod 755 src/*
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache src/server.ts