# todo-backend/Dockerfile
FROM php:8.2-fpm

# Cài các extension PHP cần thiết
RUN apt-get update && apt-get install -y \
    git curl zip unzip libzip-dev libpq-dev libpng-dev libonig-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# Cài Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Tạo thư mục app
WORKDIR /var/www

# Copy toàn bộ mã nguồn
COPY . .

# Cài đặt Laravel dependencies
RUN composer install --no-interaction --prefer-dist

# Phân quyền cho Laravel
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]
