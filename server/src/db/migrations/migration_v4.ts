import {createMigration} from "../createMigration.js";

// Заполняет базу данных тестовыми данными, просто для теста. Потом эту миграцию можно будет убрать.
// ПРИ ДОБАВЛЕНИИ МИГРАЦИИ: Не забудь добавить миграцию в файл migrations.ts
// ПРИ ДОБАВЛЕНИИ МИГРАЦИИ: Не забудь изменить номер миграции (первый аругмент функции createMigration)
export const migration_v4 = createMigration(4, `

    INSERT INTO courses (title, short_description, tags, rating)
    VALUES ('Основы React',
            'Полный курс по React для начинающих. Изучите хуки, контекст и маршрутизацию.',
            ARRAY ['React', 'Frontend', 'JavaScript'],
            4.5),
           ('TypeScript с нуля',
            'Научитесь писать типобезопасный код. Интерфейсы, дженерики и утилитарные типы.',
            ARRAY ['TypeScript', 'JavaScript'],
            5.0),
           ('Node.js и Express',
            'Создание REST API на Node.js. Работа с базами данных и аутентификация.',
            ARRAY ['Node.js', 'Express', 'Backend'],
            4.8),
           ('Docker для разработчиков',
            'Контейнеризация приложений. Docker Compose, сети и тома.',
            ARRAY ['Docker', 'DevOps'],
            4.2),
           ('PostgreSQL на практике',
            'Проектирование баз данных, сложные запросы и оптимизация производительности.',
            ARRAY ['PostgreSQL', 'SQL', 'Database'],
            4.7),
           ('Tailwind CSS',
            'Быстрая и красивая верстка с использованием utility-first CSS фреймворка.',
            ARRAY ['Tailwind CSS', 'CSS', 'Frontend'],
            4.9);

`)
