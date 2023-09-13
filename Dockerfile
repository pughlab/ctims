#	BUILD STEP
FROM node:18.12.0-alpine3.14 AS base

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

ARG NEXTAUTH_SECRET
ARG REACT_APP_API_URL
ARG NEXTAUTH_URL
ARG NEXTAUTH_API_URL

ENV NODE_ENV=production
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_API_URL=$NEXTAUTH_API_URL

#RUN npx nx run-many --target=build --all
RUN npx nx build web

## deploy
FROM build as deploy
WORKDIR /var/www/html
COPY --from=build /app/dist/apps/web .
RUN sh -c 'echo "[]" > /var/www/html/.next/server/next-font-manifest.json'

ENV NEXTAUTH_SECRET=dAbxJF2DRzqwGYn+BWKdj8o9ieMri4FWsmIRn77r2F8=
ENV REACT_APP_API_URL=http://205.210.128.25:3333/api
ENV NEXTAUTH_URL=http://localhost:3000

RUN yarn install --production

CMD npx next start
