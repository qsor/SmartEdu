import {createMigration} from "../createMigration.js";

// ПРИ ДОБАВЛЕНИИ МИГРАЦИИ: Не забудь добавить миграцию в файл migrations.ts
// ПРИ ДОБАВЛЕНИИ МИГРАЦИИ: Не забудь изменить номер миграции (первый аругмент функции createMigration)
export const migration_v4 = createMigration(4, `

-- Эта миграция больше не нужна

`)
