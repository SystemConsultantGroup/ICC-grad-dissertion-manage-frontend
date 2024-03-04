FROM node:20-alpine

ADD https://worldtimeapi.org/api/timezone/Asia/Seoul /tmp/bustcache

WORKDIR /app

COPY . .

RUN yarn install


RUN yarn build

CMD ["yarn", "start"]