// ------ Migrations core logic ------

import {lastSchemaVersion, migrations} from "./migrations/migrations.js";
import {db} from "./index.js";
import {integer, pgTable, PgTransaction} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {Migration} from "./createMigration.js";
import {NodePgDatabase} from "drizzle-orm/node-postgres";

export async function runMigrations() {
    await db.transaction(async (transaction) => {
        let currentVersion = await currentSchemaVersion(transaction)
        const targetVersion = lastSchemaVersion

        while (currentVersion < targetVersion) {
            const nextVersion = currentVersion + 1

            if (nextVersion === 1)
                console.log('database migration: Запуск миграции migration_v1 (создание схемы)')
            else
                console.log(`database migration: Запуск миграции migration_v${nextVersion}`)

            const migration = migrations.find(migration => migration.toVersion === nextVersion)
            if (!migration)
                throw new Error(`Не удалось найти миграцию migration_v${nextVersion}`)
            await runMigrationUnsafe(transaction, migration)
            currentVersion = await currentSchemaVersion(transaction)
            if (currentVersion !== nextVersion)
                throw new Error(`Что-то пошло не так... Ожидалось повышение версии схемы до ${nextVersion} после запуска миграции migration_v${nextVersion}, но в результате версия схемы изменилась на ${currentVersion}`)
        }
    })

    console.log(`database migration: Все миграции успешно применены`)
}

async function runMigrationUnsafe(transaction: NodePgDatabase, migration: Migration) {
    try {
        await migration.invokeMigrationUnsafe(transaction)
    } catch (e) {
        throw new Error(
            `Не удалось запустить миграцию migration_v${migration.toVersion}. ` +
            'Если вы добавляли миграцию, то убедитесь что передали правильный номер миграции в функцию, вот так: ' +
            `"export const migration_v${migration.toVersion} = createMigration(${migration.toVersion}, 'YOUR SQL MIGRATION CODE')"`,
            {
                cause: e,
            }
        )
    }

    await transaction.delete(schemaVersionTable)
    await transaction.insert(schemaVersionTable).values({ version: migration.toVersion })
}

// ------ Internal migrations logic ------

const schemaVersionTable = pgTable('schema_version', {
    version: integer().notNull()
})

async function currentSchemaVersion(transaction: NodePgDatabase): Promise<number> {
    if (!(await tableExists(transaction, 'schema_version'))) {
        await transaction.execute(sql`create table schema_version (version integer not null);`)
        return currentSchemaVersion(transaction)
    }
    const versionRows = await transaction.select().from(schemaVersionTable)
    const versionRow = versionRows.at(0)
    if (versionRow === undefined) {
        await transaction.insert(schemaVersionTable).values({ version: 0 })
        return currentSchemaVersion(transaction)
    }
    return versionRow.version
}

async function tableExists(transaction: NodePgDatabase, tableName: string): Promise<boolean> {
    const result = await transaction.execute(sql`
        SELECT EXISTS (
            SELECT 1
            FROM pg_tables
            WHERE schemaname = 'public' AND tablename = ${tableName}
        );
    `);

    const rows = result.rows as Record<string, any>[]
    const exists = rows?.[0]?.exists
    if (typeof exists === 'boolean')
        return exists
    if (typeof exists === 'string') {
        if (exists.toLowerCase().startsWith('f'))
            return false
        if (exists.toLowerCase().startsWith('t'))
            return true
    }
    throw new Error(`Что-то пошло не так: Невозможно определить существование таблицы ${tableName}`)
}
