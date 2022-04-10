FROM node:17-alpine

ENV NODEJS_PORT=80

VOLUME /app
WORKDIR /app

CMD yarn install && yarn run serve