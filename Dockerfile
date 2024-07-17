FROM node:20-slim

ENV WORKDIR=/app
WORKDIR $WORKDIR

COPY package.json pnpm-lock.yaml $WORKDIR

RUN apt-get update -y && apt-get upgrade -y && \
    npm install -g pnpm && \
    pnpm config set auto-install-peers true && \
    pnpm config set shamefully-hoist true && \
    pnpm install

ENV PATH=$WORKDIR/node_modules/.bin:$PATH

COPY . .

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
