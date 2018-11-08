FROM node:10.13

USER node
ENV NODE_ENV=production
RUN mkdir /home/node/app /home/node/app/dist
WORKDIR /home/node/app

COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .
RUN npm install --production

COPY --chown=node:node . .

CMD npm run build
