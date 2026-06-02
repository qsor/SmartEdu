# SmartEdu — Образовательная платформа

---

## запуск

```bash
# 1. клонирование репозитория
git clone https://github.com/qsor/smartedu.git
cd smartedu

# 2. шаблон переменных окружения
cp .env.example .env

# 3.з запуск
docker compose up -d



## разработка 

# Фронтенд
cd client
npm install
npm run dev  # → http://localhost:5173

# Бэкенд
cd server
npm install
npm run dev  # → http://localhost:3000

# База данных (должна быть запущена отдельно)


# Остановить всё
docker compose down

# Полная очистка (БД, образы, кэш)
docker compose down -v --rmi all --remove-orphans

# Пересобрать с нуля
docker compose up -d --build





## структура проекта 

SmartEdu/
├── .github/workflows/     # CI/CD (ci.yml, deploy.yml)
├── client/                # Frontend
│   ├── public/
│   ├── src/
│   │   ├── api/           # Axios-запросы к бэку
│   │   ├── components/    # UI компоненты
│   │   ├── pages/         # Login, Dashboard, CourseView, Profile
│   │   ├── store/         # Redux slices
│   │   ├── styles/        # Глобальные стили
│   │   ├── App.jsx, main.jsx, router.jsx
│   ├── package.json, vite.config.js, tailwind.config.js
│   └── Dockerfile
├── server/                # Backend
│   ├── src/
│   │   ├── config/        # db, jwt, cors
│   │   ├── controllers/   # Обработчики
│   │   ├── middleware/    # Auth, валидация, error
│   │   ├── routes/        # API роуты
│   │   ├── services/      # Бизнес-логика
│   │   ├── utils/         # Хелперы
│   │   ├── app.js, server.js
│   ├── prisma/            # Схема БД + миграции
│   ├── tests/, uploads/
│   ├── package.json
│   └── Dockerfile
├── docs/                  # API.md, DEPLOYMENT.md
├── scripts/               # setup.sh
├── docker-compose.yml     # Локальный запуск
├── nginx.conf             # reverse-proxy
├── .gitignore, .dockerignore
├── README.md, CONTRIBUTING.md
└── .env.example