FROM node:10.13

USER node

ENV NODE_ENV=production

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY . .

RUN npm install --production

CMD npm start
