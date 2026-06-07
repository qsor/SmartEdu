# 🎓 SmartEdu

**Современная образовательная платформа** для прохождения онлайн-курсов

---

## Технологический стек

| Стек | Технологии |
|------|------------|
| **Frontend** | React 18, TypeScript 5.4, Vite 5, Tailwind CSS 3, Redux Toolkit |
| **Backend** | Node.js 20, Express, TypeScript, Prisma ORM, Zod |
| **База данных** | PostgreSQL 15 |
| **Инфраструктура** | Docker, Docker Compose, Nginx, GitHub Actions |

---

## Запуск


# 1. Клонирование репозитория
```bash
git clone https://github.com/qsor/smartedu.git
```
```bash
cd smartedu
```
# 2. Шаблон переменных окружения
```bash
cp .env.example .env
```
# 3. Запуск всех сервисов
```bash
docker compose up -d
```

После запуска будут доступны:
-  **Frontend:** http://localhost:5173
-  **Backend API:** http://localhost:3000
-  **PostgreSQL:** `localhost:5433`

---

## Разработка

### Frontend
```bash
cd client
```
```bash
npm install
```
```bash
npm run dev  # → http://localhost:5173
```

### Backend
```bash
cd server
```
```bash
npm install
```
```bash
npx prisma generate
```
```bash
npm run dev  # → http://localhost:3000
```

### База данных
PostgreSQL должна быть запущена либо через Docker (`docker compose up postgres`), либо локально.

---

##  Структура проекта

```bash
SmartEdu/
├── .github/workflows/     # CI/CD (ci.yml, deploy.yml)
├── client/                # Frontend
│   ├── public/
│   ├── src/
│   │   ├── api/           # Axios-запросы к бэку
│   │   ├── components/    # UI компоненты (TSX)
│   │   ├── pages/         # Login, Dashboard, CourseView, Profile
│   │   ├── store/         # Redux slices
│   │   ├── styles/        # Глобальные стили
│   │   ├── App.tsx        # Главный компонент
│   │   ├── main.tsx       # Точка входа
│   │   └── router.tsx     # React Router
│   ├── tsconfig.json
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile
├── server/                # Backend
│   ├── src/
│   │   ├── config/        # env, db, jwt, cors
│   │   ├── controllers/   # Обработчики запросов
│   │   ├── middleware/    # Auth, валидация, error handling
│   │   ├── routes/        # API роуты
│   │   ├── services/      # Бизнес-логика
│   │   ├── utils/         # Хелперы
│   │   └── server.ts      # Точка входа
│   ├── prisma/            # Схема БД + миграции
│   ├── prisma.config.ts
│   ├── tests/
│   ├── tsconfig.json
│   ├── package.json
│   └── Dockerfile
├── docs/                  # API.md, DEPLOYMENT.md
├── scripts/               # setup.sh
├── docker-compose.yml     # Локальный запуск
├── nginx.conf             # Reverse-proxy (production)
├── .gitignore
├── .dockerignore
├── README.md
├── CONTRIBUTING.md
└── .env.example
```

---

##  Решение проблем

Если что-то пошло не так (подсвечивается красным синтаксис TypeScript , это из за этих файлах  `node_modules package-lock.json`), выполни удаление этих файлов :
```bash
rm -rf node_modules package-lock.json
```
```bash
npm install
```

Если что-то пошло не так (ошибки сборки, контейнеры не стартуют, странное поведение после изменений в `package.json`), выполни полную пересборку:

# 1. Останови всё

```bash
docker compose down
```
# 2. Пересобери и запусти заново
```bash
docker compose up -d --build
```

### Полная очистка (БД, образы, кэш)
 **Внимание:** это удалит все данные из базы данных!

```bash
docker compose down -v --rmi all --remove-orphans
```
```bash
docker compose up -d --build
```

### Полезные команды


# Посмотреть логи всех сервисов
```bash
docker compose logs -f
```

# Посмотреть логи конкретного сервиса
```bash
docker compose logs -f backend
```
```bash
docker compose logs -f frontend
```

# Статус всех контейнеров
```bash
docker compose ps
```

# Остановить все контейнеры
```bash
docker compose down
```
# Перезапустить только backend
```bash
docker compose restart backend
```

---

## Тестирование

# Backend тесты

```bash
cd server
```
```bash
npm test
```

# Frontend линт
```bash
cd client
```
```bash
npm run lint
```

---

## 📝 Лицензия

MIT © [ QSOR ](https://github.com/qsor)
