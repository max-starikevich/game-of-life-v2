FROM node:10.13

USER node
ENV NODE_ENV=development
ENV PATH="/home/node/app/node_modules/.bin:${PATH}"
RUN mkdir /home/node/app
WORKDIR /home/node/app

CMD npm run dev
