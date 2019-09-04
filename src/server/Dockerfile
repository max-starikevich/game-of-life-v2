FROM node:10.16-alpine

USER node
ENV NODE_ENV=production
ENV PATH="/home/node/app/node_modules/.bin:${PATH}"
RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY package.json yarn.lock ./
RUN yarn install 

COPY . .

CMD ["node", "index.js"]
