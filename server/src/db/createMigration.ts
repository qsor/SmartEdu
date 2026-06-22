import {NodePgDatabase} from "drizzle-orm/node-postgres";

export class Migration {
    constructor(
        public readonly toVersion: number,
        public readonly invokeMigrationUnsafe: (db: NodePgDatabase) => Promise<void>
    ) {}
}

export function createMigration(toVersion: number, sql: string): Migration {
    return new Migration(toVersion, async (db) => {
        await db.execute(sql)
    })
}
