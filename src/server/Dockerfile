FROM node:10.13

USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY . .

RUN npm install --production

CMD npm start
