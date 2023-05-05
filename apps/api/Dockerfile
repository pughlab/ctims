FROM node:16.0

WORKDIR /usr/src
RUN mkdir -p /usr/src/app
COPY ../../package.json /usr/src/
COPY ../../yarn.lock /usr/src/
RUN yarn install --loglevel=error
COPY ./ /usr/src/app/
RUN mkdir -p /usr/src/app/dist
WORKDIR /usr/src/app

RUN npx nx build api
ARG RESTSERVER_PORT=3000
ENV RESTSERVER_PORT=$RESTSERVER_PORT
EXPOSE ${RESTSERVER_PORT}
CMD ["node", "dist/main.js"]
