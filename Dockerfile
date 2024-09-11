#	BUILD STEP
FROM node:20-alpine3.17 AS base

RUN apk add --no-cache python3 make g++

## base
WORKDIR /app
COPY ./package.json ./yarn.* ./
RUN yarn install --pure-lockfile

ENV PORT=3000
EXPOSE ${PORT}

## build
FROM base AS build
COPY . .

ARG NEXTAUTH_SECRET
ARG REACT_APP_API_URL
ARG NEXTAUTH_URL
ARG NEXTAUTH_API_URL
ARG NEXT_PUBLIC_SIGNOUT_REDIRECT_URL
ARG NEXT_PUBLIC_ENABLE_MATCHMINER_INTEGRATION

ENV NODE_ENV=production
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_API_URL=$NEXTAUTH_API_URL
ENV NEXT_PUBLIC_SIGNOUT_REDIRECT_URL=$NEXT_PUBLIC_SIGNOUT_REDIRECT_URL
ENV NEXT_PUBLIC_ENABLE_MATCHMINER_INTEGRATION=$NEXT_PUBLIC_ENABLE_MATCHMINER_INTEGRATION

RUN npx nx build web

## 2nd build deploy
FROM node:20-alpine3.17 AS deploy
WORKDIR /var/www/html
COPY --from=build /app/dist/apps/web .

RUN rm -rf /var/www/html/.next/cache
RUN sh -c 'echo "[]" > /var/www/html/.next/server/next-font-manifest.json'

ENV NEXTAUTH_SECRET=dAbxJF2DRzqwGYn+BWKdj8o9ieMri4FWsmIRn77r2F8=
ENV REACT_APP_API_URL=http://backend:3333/api
ENV NEXTAUTH_URL=http://localhost:3000

RUN yarn install --production

CMD npx next start
