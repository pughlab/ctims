#	BUILD STEP
FROM node:16.14-slim AS base

#RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN apt-get update && \
    apt-get install -y \
    python3 \
    make \
    g++ && \
    rm -rf /var/lib/apt/lists/*

ARG NODE_ENV

## base
WORKDIR /usr/src
RUN mkdir -p /usr/src/app
COPY ./package.json ./yarn.* ./
RUN yarn install --pure-lockfile --loglevel=error

ENV PORT=3000
EXPOSE ${PORT}

## build frontend
FROM base as build
COPY . .

ENV NODE_ENV=production

#RUN npx nx run-many --target=build --all
RUN npx nx build web

## deploy
FROM build as deploy
WORKDIR /var/www/html
COPY --from=build /usr/src/dist/apps/web .
RUN sh -c 'echo "[]" > /var/www/html/.next/server/next-font-manifest.json'

RUN yarn install --production

CMD npx next start
