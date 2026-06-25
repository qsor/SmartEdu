import {createMigration} from "../createMigration.js";

// Добавление уроков
// ПРИ ДОБАВЛЕНИИ МИГРАЦИИ: Не забудь добавить миграцию в файл migrations.ts
// ПРИ ДОБАВЛЕНИИ МИГРАЦИИ: Не забудь изменить номер миграции (первый аругмент функции createMigration)
export const migration_v5 = createMigration(5, `

create table lessons (
    id uuid default gen_random_uuid() primary key,
    course uuid not null references courses on delete restrict on update cascade,
    course_order integer not null,
    title text not null,
    short_description text not null,
    xp integer not null
);

-- Заполнение тестовыми данными

truncate courses cascade;

INSERT INTO courses (id, title, short_description, tags, rating)
VALUES ('eb56ded0-ffb4-41f6-a838-80de81d58fd0',
        'Основы React',
        'Полный курс по React для начинающих. Изучите хуки, контекст и маршрутизацию.',
        ARRAY ['React', 'Frontend', 'JavaScript'],
        4.5),
       ('eb56ded0-ffb4-41f6-a838-80de81d58fd1',
        'TypeScript с нуля',
        'Научитесь писать типобезопасный код. Интерфейсы, дженерики и утилитарные типы.',
        ARRAY ['TypeScript', 'JavaScript'],
        5.0),
       ('eb56ded0-ffb4-41f6-a838-80de81d58fd2',
        'Node.js и Express',
        'Создание REST API на Node.js. Работа с базами данных и аутентификация.',
        ARRAY ['Node.js', 'Express', 'Backend'],
        4.8),
       ('eb56ded0-ffb4-41f6-a838-80de81d58fd3',
        'Docker для разработчиков',
        'Контейнеризация приложений. Docker Compose, сети и тома.',
        ARRAY ['Docker', 'DevOps'],
        4.2),
       ('eb56ded0-ffb4-41f6-a838-80de81d58fd4',
        'PostgreSQL на практике',
        'Проектирование баз данных, сложные запросы и оптимизация производительности.',
        ARRAY ['PostgreSQL', 'SQL', 'Database'],
        4.7),
       ('eb56ded0-ffb4-41f6-a838-80de81d58fd5',
        'Tailwind CSS',
        'Быстрая и красивая верстка с использованием utility-first CSS фреймворка.',
        ARRAY ['Tailwind CSS', 'CSS', 'Frontend'],
        4.9);

insert into lessons (id, course, course_order, title, short_description, xp)
values
-- Основы React
('bee2e4a0-1311-46d2-b29d-f151b1e00001', 'eb56ded0-ffb4-41f6-a838-80de81d58fd0', 0, 'Что такое компонент?', 'Разберёмся, как устроены React-компоненты и зачем они нужны.', 5),
('bee2e4a0-1311-46d2-b29d-f151b1e00002', 'eb56ded0-ffb4-41f6-a838-80de81d58fd0', 1, 'JSX и рендеринг', 'Научимся писать JSX и выводить данные на страницу.', 10),
('bee2e4a0-1311-46d2-b29d-f151b1e00003', 'eb56ded0-ffb4-41f6-a838-80de81d58fd0', 2, 'Props и композиция', 'Передача данных между компонентами через props.', 10),
('bee2e4a0-1311-46d2-b29d-f151b1e00004', 'eb56ded0-ffb4-41f6-a838-80de81d58fd0', 3, 'State и useState', 'Изучим локальное состояние компонентов.', 15),
('bee2e4a0-1311-46d2-b29d-f151b1e00005', 'eb56ded0-ffb4-41f6-a838-80de81d58fd0', 4, 'Эффекты и useEffect', 'Работа с побочными эффектами.', 15),
('bee2e4a0-1311-46d2-b29d-f151b1e00006', 'eb56ded0-ffb4-41f6-a838-80de81d58fd0', 5, 'Контекст приложения', 'Использование Context API для глобального состояния.', 20),
('bee2e4a0-1311-46d2-b29d-f151b1e00007', 'eb56ded0-ffb4-41f6-a838-80de81d58fd0', 6, 'Маршрутизация', 'Навигация между страницами через React Router.', 20),

-- TypeScript с нуля
('bee2e4a0-1311-46d2-b29d-f151b1e00008', 'eb56ded0-ffb4-41f6-a838-80de81d58fd1', 0, 'Зачем нужен TypeScript?', 'Преимущества типизации в JavaScript-проектах.', 5),
('bee2e4a0-1311-46d2-b29d-f151b1e00009', 'eb56ded0-ffb4-41f6-a838-80de81d58fd1', 1, 'Базовые типы', 'string, number, boolean и другие типы.', 10),
('bee2e4a0-1311-46d2-b29d-f151b1e00010', 'eb56ded0-ffb4-41f6-a838-80de81d58fd1', 2, 'Интерфейсы', 'Описание структуры объектов через interface.', 15),
('bee2e4a0-1311-46d2-b29d-f151b1e00011', 'eb56ded0-ffb4-41f6-a838-80de81d58fd1', 3, 'Дженерики', 'Создание переиспользуемых типизированных сущностей.', 20),
('bee2e4a0-1311-46d2-b29d-f151b1e00012', 'eb56ded0-ffb4-41f6-a838-80de81d58fd1', 4, 'Union и Intersection', 'Комбинирование типов.', 15),
('bee2e4a0-1311-46d2-b29d-f151b1e00013', 'eb56ded0-ffb4-41f6-a838-80de81d58fd1', 5, 'Утилитарные типы', 'Partial, Pick, Omit и другие полезные утилиты.', 20),

-- Node.js и Express
('bee2e4a0-1311-46d2-b29d-f151b1e00014', 'eb56ded0-ffb4-41f6-a838-80de81d58fd2', 0, 'Введение в Node.js', 'Разберём архитектуру и возможности платформы.', 5),
('bee2e4a0-1311-46d2-b29d-f151b1e00015', 'eb56ded0-ffb4-41f6-a838-80de81d58fd2', 1, 'Создание первого сервера', 'Поднимем HTTP-сервер на Node.js.', 10),
('bee2e4a0-1311-46d2-b29d-f151b1e00016', 'eb56ded0-ffb4-41f6-a838-80de81d58fd2', 2, 'Express Framework', 'Основы работы с Express.', 10),
('bee2e4a0-1311-46d2-b29d-f151b1e00017', 'eb56ded0-ffb4-41f6-a838-80de81d58fd2', 3, 'Маршруты и middleware', 'Организация запросов и промежуточной логики.', 15),
('bee2e4a0-1311-46d2-b29d-f151b1e00018', 'eb56ded0-ffb4-41f6-a838-80de81d58fd2', 4, 'Работа с PostgreSQL', 'Подключение базы данных к приложению.', 20),
('bee2e4a0-1311-46d2-b29d-f151b1e00019', 'eb56ded0-ffb4-41f6-a838-80de81d58fd2', 5, 'CRUD API', 'Создание полноценного REST API.', 20),
('bee2e4a0-1311-46d2-b29d-f151b1e00020', 'eb56ded0-ffb4-41f6-a838-80de81d58fd2', 6, 'JWT аутентификация', 'Защита API с помощью токенов.', 25),
('bee2e4a0-1311-46d2-b29d-f151b1e00021', 'eb56ded0-ffb4-41f6-a838-80de81d58fd2', 7, 'Обработка ошибок', 'Грамотная работа с ошибками и логированием.', 15),

-- Docker для разработчиков
('bee2e4a0-1311-46d2-b29d-f151b1e00022', 'eb56ded0-ffb4-41f6-a838-80de81d58fd3', 0, 'Что такое контейнеризация?', 'Понимание концепции контейнеров.', 5),
('bee2e4a0-1311-46d2-b29d-f151b1e00023', 'eb56ded0-ffb4-41f6-a838-80de81d58fd3', 1, 'Установка Docker', 'Подготовка окружения для работы.', 10),
('bee2e4a0-1311-46d2-b29d-f151b1e00024', 'eb56ded0-ffb4-41f6-a838-80de81d58fd3', 2, 'Dockerfile', 'Создание собственных образов.', 15),
('bee2e4a0-1311-46d2-b29d-f151b1e00025', 'eb56ded0-ffb4-41f6-a838-80de81d58fd3', 3, 'Docker Compose', 'Оркестрация нескольких сервисов.', 20),
('bee2e4a0-1311-46d2-b29d-f151b1e00026', 'eb56ded0-ffb4-41f6-a838-80de81d58fd3', 4, 'Сети и тома', 'Хранение данных и взаимодействие контейнеров.', 20),

-- PostgreSQL на практике
('bee2e4a0-1311-46d2-b29d-f151b1e00027', 'eb56ded0-ffb4-41f6-a838-80de81d58fd4', 0, 'Устройство PostgreSQL', 'Основы архитектуры базы данных.', 5),
('bee2e4a0-1311-46d2-b29d-f151b1e00028', 'eb56ded0-ffb4-41f6-a838-80de81d58fd4', 1, 'Создание таблиц', 'Работа с DDL-командами.', 10),
('bee2e4a0-1311-46d2-b29d-f151b1e00029', 'eb56ded0-ffb4-41f6-a838-80de81d58fd4', 2, 'Связи между таблицами', 'One-to-One, One-to-Many и Many-to-Many.', 15),
('bee2e4a0-1311-46d2-b29d-f151b1e00030', 'eb56ded0-ffb4-41f6-a838-80de81d58fd4', 3, 'Сложные SELECT-запросы', 'JOIN, GROUP BY и агрегатные функции.', 20),
('bee2e4a0-1311-46d2-b29d-f151b1e00031', 'eb56ded0-ffb4-41f6-a838-80de81d58fd4', 4, 'Индексы', 'Ускорение выполнения запросов.', 20),
('bee2e4a0-1311-46d2-b29d-f151b1e00032', 'eb56ded0-ffb4-41f6-a838-80de81d58fd4', 5, 'Транзакции', 'Гарантии целостности данных.', 15),
('bee2e4a0-1311-46d2-b29d-f151b1e00033', 'eb56ded0-ffb4-41f6-a838-80de81d58fd4', 6, 'Оптимизация производительности', 'Анализ и улучшение запросов.', 25),

-- Tailwind CSS
('bee2e4a0-1311-46d2-b29d-f151b1e00034', 'eb56ded0-ffb4-41f6-a838-80de81d58fd5', 0, 'Знакомство с Tailwind', 'Основы utility-first подхода.', 5),
('bee2e4a0-1311-46d2-b29d-f151b1e00035', 'eb56ded0-ffb4-41f6-a838-80de81d58fd5', 1, 'Отступы и размеры', 'Работа с spacing и sizing утилитами.', 10),
('bee2e4a0-1311-46d2-b29d-f151b1e00036', 'eb56ded0-ffb4-41f6-a838-80de81d58fd5', 2, 'Flexbox и Grid', 'Создание адаптивных макетов.', 15),
('bee2e4a0-1311-46d2-b29d-f151b1e00037', 'eb56ded0-ffb4-41f6-a838-80de81d58fd5', 3, 'Цвета и типографика', 'Оформление интерфейсов.', 15),
('bee2e4a0-1311-46d2-b29d-f151b1e00038', 'eb56ded0-ffb4-41f6-a838-80de81d58fd5', 4, 'Адаптивность', 'Responsive-дизайн с Tailwind.', 20),
('bee2e4a0-1311-46d2-b29d-f151b1e00039', 'eb56ded0-ffb4-41f6-a838-80de81d58fd5', 5, 'Создание UI-компонентов', 'Соберём набор переиспользуемых компонентов.', 20);

`)
