FROM php:8.2-apache

RUN apt-get update && apt-get install -y libpq-dev git unzip \
    && docker-php-ext-install pdo pdo_mysql

RUN a2dismod mpm_event mpm_worker 2>/dev/null || true \
    && a2enmod mpm_prefork rewrite

COPY ./frontend /var/www/html/frontend
COPY ./backend /var/www/html/backend

RUN echo '<meta http-equiv="refresh" content="0; url=/frontend/index.html">' > /var/www/html/index.html

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html
RUN composer require phpmailer/phpmailer --no-interaction

EXPOSE 80
CMD ["/usr/local/bin/docker-entrypoint.sh"]