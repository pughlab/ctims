#	BUILD STEP
FROM node:current-alpine3.16 AS base

ARG NODE_ENV

## base
WORKDIR /app
COPY ./package.json ./yarn.* ./
RUN yarn install

ENV PORT=3000
EXPOSE ${PORT}

## build
FROM base as build
COPY . .

ENV NODE_ENV=production

RUN npx nx run-many --target=build --all

## deploy
FROM build as deploy
WORKDIR /var/www/html
COPY --from=build /app/dist/apps/web .

RUN yarn install --production

CMD npx next start
