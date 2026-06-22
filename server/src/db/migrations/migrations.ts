import {Migration} from "../createMigration.js";
import {migration_v1} from "./migration_v1.js";
import {migration_v2} from "./migration_v2.js";

// Сюда должны быть добавлены все миграции, от 1 до последней в порядке возрастания.
export const migrations: Migration[] = [
    migration_v1,
    migration_v2,
]

// ------ Проверка, что массив migrations составлен правильно ------

if (migrations.length === 0)
    throw new Error('Массив migrations не может быть пустым!')

let nextExpectedMigrationId = 1
for (const migration of migrations) {
    if (migration.toVersion !== nextExpectedMigrationId) {
        const index = nextExpectedMigrationId - 1
        throw new Error(
            `Ожидается миграция ${nextExpectedMigrationId} на индексе ${index} в массиве migrations, ` +
            `но получена миграция с номером ${migration.toVersion}.\n` +
            'Массив migrations составлен неверно. ' +
            'Убедитесь что в него добавлены все миграции: от самой первой до самой последней.\n' +
            'Если вы добавляли новую миграцию, убедитесь, что в функцию createMigration была передана правильная версия миграции' +
            ': Например если миграция называется "migration_5", то нужно вызывать createMigration(5, "YOUR SQL MIGRATION CODE").\n' +
            'В миграциях не должно быть пропусков: Например миграция 6 не может идти сразу после миграции 4.'
        )
    }
    nextExpectedMigrationId++
}

//

export const lastSchemaVersion = migrations[migrations.length - 1].toVersion
