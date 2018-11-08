FROM node:10.13

USER node
ENV NODE_ENV=production
RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY package.json .
COPY package-lock.json .
RUN npm install --production

COPY . .

CMD npm start
