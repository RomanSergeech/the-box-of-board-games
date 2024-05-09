
FROM node:alpine as BUILD
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build:prod


FROM nginx

COPY --from=BUILD /app/dist/ /data/www/
COPY robots.txt /data/www/
COPY sitemap.xml /data/www/
COPY nginx/ensite.conf /etc/nginx/conf.d/ensite.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]