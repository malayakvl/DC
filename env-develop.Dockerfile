#                                                          .;;,
#                                     .,.               .,;;;;;,
#                                    ;;;;;;;,,        ,;;%%%%%;;
#                                     `;;;%%%%;;,.  ,;;%%;;%%%;;
#                                       `;%%;;%%%;;,;;%%%%%%%;;'
#                                         `;;%%;;%:,;%%%%%;;%%;;,
#                                            `;;%%%,;%%%%%%%%%;;;
#                                               `;:%%%%%%;;%%;;;'
#           ..,,,.                                 .:::::::.
#        .;;;;;;;;;;,.                                  s.
#        `;;;;;;;;;;;;;,                               ,SSSs.
#          `:.:.:.:.:.:.:.                            ,SSSSSSs.
#           .;;;;;;;;;;;;;::,                        ,SSSSSSSSS,
#          ;;;;;;;;;;;;;;;;:::%,                    ,SS%;SSSSSSsS
#         ;;;;;;,:,:::::::;::::%%,                  SS%;SSSSSSsSS
#         ;;;;;,::a@@@@@@a::%%%%%%%,.   ...         SS%;SSSSSSSS'
#         `::::::@@@@@@@@@@@a;%%%%%%%%%'  #;        `SS%;SSSSS'
#  .,sSSSSs;%%,::@@@@@@;;' #`@@a;%%%%%'   ,'          `S%;SS'
#sSSSSSSSSSs;%%%,:@@@@a;;   .@@@a;%%sSSSS'           .%%%;SS,
#`SSSSSSSSSSSs;%%%,:@@@a;;;;@@@;%%sSSSS'        ..,,%%%;SSSSSSs.
#  `SSSSSSSSSSSSs;%%,%%%%%%%%%%%SSSS'     ..,,%;sSSS;%;SSSSSSSSs.
#     `SSSSSSSSSSS%;%;sSSSS;""""   ..,,%sSSSS;;SSSS%%%;SSSSSSSSSS.
#         """""" %%;SSSSSS;;%..,,sSSS;%SSSSS;%;%%%;%%%%;SSSSSS;SSS.
#                `;SSSSS;;%%%%%;SSSS;%%;%;%;sSSS;%%%%%%%;SSSSSS;SSS
#                 ;SSS;;%%%%%%%%;%;%sSSSS%;SSS;%%%%%%%%%;SSSSSS;SSS
#                 `S;;%%%%%%%%%%%%%SSSSS;%%%;%%%%%%%%%%%;SSSSSS;SSS
#                  ;SS;%%%%%%%%%%%%;%;%;%%;%%%%%%%%%%%%;SSSSSS;SSS'
#                  SS;%%%%%%%%%%%%%%%%%%%;%%%%%%%%%%%;SSSSSS;SSS'
#                  SS;%%%%%%%%%%%%%%%%%%;%%%%%%%%%%%;SSSSS;SSS'
#                  SS;%%%%%%%%%%%%%;sSSs;%%%%%%%%;SSSSSS;SSSS
#                  `SS;%%%%%%%%%%%%%%;SS;%%%%%%;SSSSSS;SSSS'
#                   `S;%%%%%%%%%%%%%%%;S;%%%%%;SSSS;SSSSS%
#                    `S;%;%%%%%%%%%%%'   `%%%%;SSS;SSSSSS%.
#                  ,S;%%%%%%%%%%;'      `%%%%%;S   `SSSSs%,.
#                  ,%%%%%%%%%%;%;'         `%;%%%;     `SSSs;%%,.
#               ,%%%%%%;;;%;;%;'           .%%;%%%       `SSSSs;%%.
#            ,%%%%%' .%;%;%;'             ,%%;%%%'         `SSSS;%%
#          ,%%%%'   .%%%%'              ,%%%%%'             `SSs%%'
#        ,%%%%'    .%%%'              ,%%%%'                ,%%%'
#      ,%%%%'     .%%%              ,%%%%'                 ,%%%'
#    ,%%%%'      .%%%'            ,%%%%'                  ,%%%'
#  ,%%%%'        %%%%           ,%%%'                    ,%%%%
#  %%%%'       .:::::         ,%%%'                      %%%%'
#.:::::        :::::'       ,%%%'                       ,%%%%
#:::::'                   ,%%%%'                        %%%%%
#                        %%%%%'                         %%%%%
#                      .::::::                        .::::::
#                      ::::::'                        ::::::'

####################################################################
####################################################################
####################################################################
## app-develop
####################################################################
####################################################################
####################################################################

####################################################################
## https://serversideup.net/open-source/docker-php/
####################################################################

FROM serversideup/php:8.3-unit

#####################################################################

ENV ENVIRONMENT=develop

ENV PHP_VERSION=8.3
ENV NODE_VERSION=24

ENV TZ=UTC
ENV DEBIAN_FRONTEND=noninteractive

#####################################################################
## Allow HTTP and HTTPS
#####################################################################

ENV SSL_MODE=mixed

ENV PHP_OPCACHE_ENABLE=1

#####################################################################

ARG DB_PASSWORD

#####################################################################

USER root

#####################################################################

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && echo "Acquire::http::Pipeline-Depth 0;" > /etc/apt/apt.conf.d/99custom \
    && echo "Acquire::http::No-Cache true;"   >> /etc/apt/apt.conf.d/99custom \
    && echo "Acquire::BrokenProxy true;"      >> /etc/apt/apt.conf.d/99custom \
    && mkdir -p /etc/apt/keyrings \
    && apt --yes --assume-yes --quiet update \
    && apt --yes --assume-yes --quiet --no-install-recommends install \
        bash \
        ca-certificates \
        curl \
        gnupg \
        gosu \
        jpegoptim \
        libevent-dev \
        optipng \
        unzip \
        zip \
    && curl -fsSL \
        https://deb.nodesource.com/setup_$NODE_VERSION.x \
        -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs \
    && install-php-extensions \
        bcmath \
        bz2 \
        curl \
        dom \
        gd \
        intl \
        mbstring \
        opcache \
        pcntl \
        pdo_pgsql \
        sockets \
        tidy \
        xml \
        zip \
    && apt --yes --assume-yes --quiet autoremove \
    && apt --yes --assume-yes --quiet autoclean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

####################################################################

WORKDIR /var/www/html

USER www-data

####################################################################
## Copy the app files to the container
####################################################################

COPY --chown=www-data:www-data . .

####################################################################
## Copy the .env file to the container
####################################################################

# COPY --chown=www-data:www-data \
#     ./.dokku/environment/${ENVIRONMENT}/env.sh \
#     ./.env

####################################################################

RUN composer install \
        --no-interaction \
        --no-progress \
        --optimize-autoloader \
    && composer dump-autoload --optimize \
    && npm install \
    && npm run dev \
    && mkdir -p storage/app/public \
    && mkdir -p storage/logs \
    && mkdir -p storage/framework/cache \
    && mkdir -p storage/framework/sessions \
    && mkdir -p storage/framework/views \
    && mkdir -p storage/framework/testing \
    && php artisan config:cache \
    && php artisan key:generate \
    && php artisan storage:link \
    && chown www-data:www-data storage -R \
    && chmod 777 storage -R \
    && sed -i \
        -e "s/DB_PASSWORD=/DB_PASSWORD=${DB_PASSWORD}/" \
        .env

####################################################################

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
