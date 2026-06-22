import {createMigration} from "../createMigration.js";

// Самая первая миграция. Создаёт изначальную схему в базе данных.
// ПРИ ДОБАВЛЕНИИ МИГРАЦИИ: Не забудь добавить миграцию в файл migrations.ts
// ПРИ ДОБАВЛЕНИИ МИГРАЦИИ: Не забудь изменить номер миграции (первый аругмент функции createMigration)
export const migration_v1 = createMigration(1, `

create table users (
    id uuid default gen_random_uuid() primary key,
    first_name varchar(255) not null,
    last_name varchar(255),
    email varchar(255) unique,
    phone_number varchar(50) unique,
    password_hash text,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);

create table courses (
    id uuid default gen_random_uuid() primary key,
    title varchar(255) not null,
    short_description text not null,
    tags text[] not null,
    rating double precision not null
);

create table sessions (
    id uuid primary key,
    user_id uuid not null,
    current_refresh_token text not null,
    created_at timestamp not null default now()
);

`)
