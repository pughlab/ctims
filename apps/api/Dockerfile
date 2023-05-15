FROM node:16.14-slim

#RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN apt-get update && \
    apt-get install -y \
    python3 \
    make \
    g++ && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src
RUN mkdir -p /usr/src/app
COPY package.json /usr/src/
COPY yarn.lock /usr/src/

COPY ./ /usr/src/app/
RUN mkdir -p /usr/src/app/dist
WORKDIR /usr/src/app
RUN yarn install --loglevel=error

#CMD ["yarn", "schema:generate-client"]
#RUN npx nx build api
#ARG RESTSERVER_PORT=3000
#ENV RESTSERVER_PORT=$RESTSERVER_PORT
#EXPOSE ${RESTSERVER_PORT}

RUN yarn generate:build
#RUN yarn start:prod
CMD ["yarn", "start:prod"]
#CMD ["tail", "-f", "/dev/null"]

