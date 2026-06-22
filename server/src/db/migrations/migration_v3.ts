
// Добавляет функциональность для поиска.
// ПРИ ДОБАВЛЕНИИ МИГРАЦИИ: Не забудь добавить миграцию в файл migrations.ts
// ПРИ ДОБАВЛЕНИИ МИГРАЦИИ: Не забудь изменить номер миграции (первый аругмент функции createMigration)
import {createMigration} from "../createMigration.js";

export const migration_v3 = createMigration(3, `

create extension if not exists pg_trgm;

`)
