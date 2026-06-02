FROM node:20-bookworm

WORKDIR /app

# копирования package.json
COPY package*.json ./

# установка зависимостей
RUN npm install

# копирования исх кода
COPY . .

# Открываем порт
EXPOSE 3000

# запуск (будет переопределено в docker-compose)
CMD ["npm", "run", "dev"]