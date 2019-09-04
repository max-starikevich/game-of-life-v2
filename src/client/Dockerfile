# stage 1: compile a build
FROM node:10.16-alpine as create-react-app

USER node
ENV PATH="/home/node/app/node_modules/.bin:${PATH}"
ENV NODE_ENV=production
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# create a layer with node_modules
COPY package.json yarn.lock ./
RUN yarn install

# create a layer with the build artifact (using only necessary source code)
COPY public ./public
COPY src ./src

RUN yarn build

# stage 2: copy the build artifact to nginx-based image and finish the image
FROM nginx:1.15-alpine

COPY --from=create-react-app /home/node/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]