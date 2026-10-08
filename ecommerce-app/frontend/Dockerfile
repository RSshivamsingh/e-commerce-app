FROM nginx:alpine

# 1. Clean out Nginx's default welcome page
RUN rm -rf /usr/share/nginx/html/*

# 2. Copy the CONTENTS inside public/ directly into Nginx's web root
COPY ./public/ /usr/share/nginx/html/

# 3. Copy css and js folders directly into Nginx's web root
COPY ./css /usr/share/nginx/html/css
COPY ./js /usr/share/nginx/html/js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
