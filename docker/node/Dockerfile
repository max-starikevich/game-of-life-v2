FROM node:10.12

RUN mkdir /home/node/.npm && chown -R node:node /home/node/.npm

RUN npm install -g npx

USER node

WORKDIR /home/node/app

CMD npm start
