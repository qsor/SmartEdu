import {pgTable, uuid, varchar, text, timestamp, integer, doublePrecision, bigint} from 'drizzle-orm/pg-core';
import {sql} from "drizzle-orm";

export type UserRow = typeof users.$inferSelect
export type UserInsert = typeof users.$inferInsert
export const users = pgTable('users', {
    id: uuid().defaultRandom().primaryKey(),
    first_name: varchar({length: 255}).notNull(),
    last_name: varchar({length: 255}),
    email: varchar({length: 255}).unique(),
    phone_number: varchar({length: 50}).unique(),
    password_hash: text().notNull(),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().defaultNow().notNull(),
});

export type CourseRow = typeof courses.$inferSelect
export type CourseInsert = typeof courses.$inferInsert
export const courses = pgTable('courses', {
    id: uuid().defaultRandom().primaryKey(),
    title: varchar({length: 255}).notNull(),
    short_description: text().notNull(),
    tags: text().array().notNull(),
    rating: doublePrecision().notNull(),
});

export type LessonRow = typeof lessons.$inferSelect
export type LessonInsert = typeof lessons.$inferInsert
export const lessons = pgTable('lessons', {
    id: uuid().default(sql`gen_random_uuid()::text`).primaryKey(),
    course: uuid().notNull()
        .references(() => courses.id, {onDelete: 'restrict', onUpdate: 'cascade'}),
    course_order: integer().notNull(),
    title: text().notNull(),
    short_description: text().notNull(),
    xp: integer().notNull(),
});

export type SessionRow = typeof sessions.$inferSelect
export type SessionInsert = typeof sessions.$inferInsert
export const sessions = pgTable('sessions', {
    id: uuid().primaryKey(),
    user_id: uuid()
        .references(() => users.id, {onDelete: 'cascade', onUpdate: 'cascade'})
        .notNull(),
    current_refresh_token: text().notNull(),
    created_at: timestamp().defaultNow().notNull(),
});
