FROM php:8.2-apache

RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_mysql

COPY ./frontend /var/www/html/frontend
COPY ./backend /var/www/html/backend

RUN echo '<meta http-equiv="refresh" content="0; url=/frontend/index.html">' > /var/www/html/index.html

EXPOSE 80