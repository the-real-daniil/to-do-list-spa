# ---- Этап 1: сборка ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
ARG APP_TITLE
ENV APP_TITLE=$APP_TITLE
RUN npm run build


# ---- Этап 2: раздача статики ----
FROM nginx:alpine AS runner

# Копируем собранные файлы в папку Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем кастомный конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]