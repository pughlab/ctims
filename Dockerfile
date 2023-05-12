#	BUILD STEP
FROM node:current-alpine3.16 AS base

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

ARG NODE_ENV

## base
WORKDIR /app
COPY ./package.json ./yarn.* ./
RUN yarn install --pure-lockfile

ENV PORT=3000
EXPOSE ${PORT}

## build
FROM base as build
COPY . .

ENV NODE_ENV=production

#RUN npx nx run-many --target=build --all
RUN npx nx build web

## deploy
FROM build as deploy
WORKDIR /var/www/html
COPY --from=build /app/dist/apps/web .
RUN sh -c 'echo "[]" > /var/www/html/.next/server/next-font-manifest.json'

RUN yarn install --production

CMD npx next start
