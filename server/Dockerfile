FROM php:apache
RUN docker-php-ext-install mysqli
RUN apt-get update -yq && \
        apt-get install -yq iputils-ping && \
        rm -rf /var/cache/apt/*
# Enable headers module
RUN a2enmod headers rewrite
