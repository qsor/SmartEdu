# 1. Базовый образ
FROM node:20-bookworm

# 2. Рабочая директория
WORKDIR /app

# 3.только манифесты зависимостей
COPY package*.json ./

# 4. установка зависимостей 
RUN npm install

# 5. Копирования  всего кода
COPY . .

# 6. порт Vite
EXPOSE 5173

# 7. запуск (npm run dev)
CMD ["npm", "run", "dev"]