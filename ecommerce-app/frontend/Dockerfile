FROM nginx:alpine

WORKDIR /usr/share/ngnix/html

RUN rm -rf ./*

COPY ./public /urs/share/ngnix/html/public
COPY ./css /urs/share/ngnix/html/css
COPY ./js /urs/share/ngnix/html/js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

