import {createMigration} from "../createMigration.js";


// Вторая миграция. Добавляет внешний ключ в таблицу sessions.
// ПРИ ДОБАВЛЕНИИ МИГРАЦИИ: Не забудь добавить миграцию в файл migrations.ts
// ПРИ ДОБАВЛЕНИИ МИГРАЦИИ: Не забудь изменить номер миграции (первый аругмент функции createMigration)
export const migration_v2 = createMigration(2, `

alter table sessions add constraint user_id_fkey
    foreign key (user_id) references users on delete cascade on update cascade

`)
