# 🎓 SmartEdu  by LLC MARLO GROUP

**Современная образовательная платформа** для прохождения онлайн-курсов

---

## Технологический стек

| Стек | Технологии |
| :--- | :--- |
| **Frontend** | <img src="https://cdn.simpleicons.org/react" width="18" style="vertical-align: middle; margin-right: 4px;"> React 18 &nbsp; <img src="https://cdn.simpleicons.org/typescript" width="18" style="vertical-align: middle; margin-right: 4px;"> TypeScript 5.4 &nbsp; <img src="https://cdn.simpleicons.org/vite" width="18" style="vertical-align: middle; margin-right: 4px;"> Vite 5 &nbsp; <img src="https://cdn.simpleicons.org/tailwindcss" width="18" style="vertical-align: middle; margin-right: 4px;"> Tailwind CSS 3 &nbsp; <img src="https://cdn.simpleicons.org/redux" width="18" style="vertical-align: middle; margin-right: 4px;"> Redux Toolkit |
| **Backend** | <img src="https://cdn.simpleicons.org/nodedotjs" width="18" style="vertical-align: middle; margin-right: 4px;"> Node.js 20 &nbsp; <img src="https://cdn.simpleicons.org/express" width="18" style="vertical-align: middle; margin-right: 4px;"> Express &nbsp; <img src="https://cdn.simpleicons.org/typescript" width="18" style="vertical-align: middle; margin-right: 4px;"> TypeScript &nbsp; <img src="https://cdn.simpleicons.org/prisma" width="18" style="vertical-align: middle; margin-right: 4px;"> Prisma ORM &nbsp; <img src="https://cdn.simpleicons.org/zod" width="18" style="vertical-align: middle; margin-right: 4px;"> Zod |
| **База данных** | <img src="https://cdn.simpleicons.org/postgresql" width="18" style="vertical-align: middle; margin-right: 4px;"> PostgreSQL 15 |
| **Инфраструктура** | <img src="https://cdn.simpleicons.org/docker" width="18" style="vertical-align: middle; margin-right: 4px;"> Docker &nbsp; <img src="https://cdn.simpleicons.org/nginx" width="18" style="vertical-align: middle; margin-right: 4px;"> Nginx &nbsp; <img src="https://cdn.simpleicons.org/githubactions" width="18" style="vertical-align: middle; margin-right: 4px;"> GitHub Actions |
---
## Разработчики 
<a href="https://github.com/qsor" title="qsor">
  <img src="https://github.com/qsor.png?size=40" width="40" style="border-radius: 50%; margin-right: 8px;" alt="qsor">
</a>
<a href="https://github.com/Ghouloleg" title="qsor">
  <img src="https://github.com/Ghouloleg.png?size=50" width="50" style="border-radius: 50%; margin-right: 8px;" alt="qsor">
</a>

## Запуск


# 1. Клонирование репозитория
```bash
git clone https://github.com/qsor/smartedu.git
```
```bash
cd SmartEdu
```
# 2. Шаблон переменных окружения
```bash
cp .env.example .env
```
# 3. Запуск всех сервисов
```bash
docker compose up -d
```
# !!! Если ничего не запустилось - пересобираем все и запускаем
```bash
docker compose up -d --build
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


Если подсвечивается react-dom/client в main.tsx, то нужно выполнить установку типов : 
если не перешли в папку , то 
```bash
cd client
```
сама установка
```bash
npm install -D @types/react-dom
```


Если что-то пошло не так (подсвечивается красным синтаксис TypeScript , это из за этих файлах  `node_modules package-lock.json`), выполни удаление этих файлов :
само удаление ( если их нету то не помешает проверить этой командой ) 
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

MIT © [ MARLO GROUP ](https://github.com/qsor)
