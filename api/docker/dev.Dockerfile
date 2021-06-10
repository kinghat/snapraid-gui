FROM hayd/alpine-deno:1.9.2

RUN apk --update add python3 git smartmontools tzdata && \
  apk add snapraid --update-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing --allow-untrusted && \
  # git clone https://github.com/Chronial/snapraid-runner.git /app/snapraid-runner && \
  # chmod +x /app/snapraid-runner/snapraid-runner.py && \
  rm -rf /var/cache/apk/*

# RUN echo '0 3 * * * /usr/bin/python3 /app/snapraid-runner/snapraid-runner.py -c /config/snapraid-runner.conf' > /etc/crontabs/root

VOLUME /config

COPY docker/docker-entry.sh  /
RUN chmod 755 /docker-entry.sh

# RUN ["/docker-entry.sh"]

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

CMD ["run", "--allow-net", "src/server.ts"]