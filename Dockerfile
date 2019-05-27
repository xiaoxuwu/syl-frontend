FROM mhart/alpine-node:11 AS builder
WORKDIR /app
COPY . .
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install
CMD ["yarn", "start"]
