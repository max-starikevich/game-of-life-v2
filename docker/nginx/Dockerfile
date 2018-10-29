FROM nginx:1.15.5

ADD conf/nginx.conf /etc/nginx/
ADD conf/default.conf /etc/nginx/conf.d/

RUN usermod -u 1000 www-data && groupmod -g 1000 www-data
