FROM node:16.14-slim AS base

#RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN apt-get update && \
    apt-get install -y \
    python3 \
    make \
    g++ && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src
#RUN mkdir -p /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install --loglevel=error

#ARG RESTSERVER_PORT=3000
#ENV RESTSERVER_PORT=$RESTSERVER_PORT
#EXPOSE ${RESTSERVER_PORT}

COPY . .
#RUN mkdir -p /usr/src/app/dist

#CMD ["yarn", "schema:generate-client"]
RUN yarn schema:generate-client
#RUN yarn schema:push
CMD ["yarn", "schema:push"]
#RUN chmod +x ./script.sh && ./script.sh

RUN npx nx build api

#CMD ["node", "dist/main.js"]
#CMD ["yarn", "generate:build"]
RUN yarn generate:build
ENV DATABASE_URL=mysql://ctims:ctims@database:3306/ctims

CMD ["yarn", "start:prod"]
#CMD ["tail", "-f", "/dev/null"]
