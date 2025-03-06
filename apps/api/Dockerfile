FROM node:18.14-slim AS base

RUN apt-get update && \
    apt-get install -y \
    python3 \
    make \
    openssl libssl-dev \
    g++ && \
    rm -rf /var/lib/apt/lists/*

RUN yarn global add nx

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

COPY ./ /usr/src/app/

RUN yarn install --loglevel=error

RUN yarn generate:build

# Run migrations.  
# RUN npx prisma migrate deploy 

# using node:18 here due to prisma issue of missing openssl lib: https://github.com/prisma/prisma/issues/15598
FROM node:18.14-slim AS production

RUN apt-get update
RUN apt-get install -y openssl libssl-dev

## Copy built files from the build stage
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/dist ./dist
COPY --from=base /usr/src/app/apps/api/prisma ./apps/api/prisma
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=base /usr/src/app/package.json ./package.json

CMD ["yarn", "start:prod"]
