# TODO: use debian or ubuntu based node image
# TODO: improve cashe deletion

FROM node:14-alpine

RUN apk update && apk add build-base git python

COPY package.json .
COPY yarn.lock .
COPY ./src ./src
COPY ./dist ./dist
COPY ./views ./views

RUN yarn install --production

EXPOSE 8000
ENV PORT 8000
ENV NODE_ENV production

CMD ["yarn", "start:prod"]
