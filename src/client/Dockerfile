FROM node:10.13-alpine

USER node
ENV NODE_ENV=production
ENV PATH="/home/node/app/node_modules/.bin:${PATH}"
RUN mkdir /home/node/app /home/node/app/dist
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
RUN npm install --production

COPY --chown=node:node . .

CMD ["webpack", "--config", "./webpack/production.config.js"]
