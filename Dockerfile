# Multi-stage build для MedoEDUz

# Stage 1: Build (если будем добавлять сборку)
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Stage 2: Production
FROM nginx:alpine

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем статические файлы
COPY --from=builder /app /usr/share/nginx/html

# Открываем порт
EXPOSE 80

# Метаданные
LABEL maintainer="MedoEDUz Team <info@medoeduz.com>"
LABEL version="1.0.0"
LABEL description="MedoEDUz - Образовательная платформа для обучения ИИ"

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
