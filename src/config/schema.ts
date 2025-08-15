import { pgTable, text, uuid, timestamp, json, varchar } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user_table', {
    id: uuid().primaryKey().defaultRandom(),
    userId: varchar({ length: 255 }).notNull().default(''),
    username: varchar({length: 500}).default(''),
    email: varchar({length: 255}),
    createdAt: timestamp().defaultNow().notNull().defaultNow(),
    updatedAt: timestamp().defaultNow().notNull().defaultNow(),
    provider: varchar({ length: 255 }).notNull().default(''),
})

export const courseTable = pgTable('course_table', {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 50 }).notNull(),
    description: text().notNull(),
    thumbnail: text().default('link'),
    instructorId: uuid('instructorId').notNull().references(() => userTable.id, { onDelete: 'cascade' }),
    studentsId: varchar({ length: 255 }).array().default([]),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});
// userId: varchar({length: 255}).notNull().references(()=>userTable.id, {onDelete: 'cascade'})

export const sectionsTable = pgTable('sections_table', {
    id: uuid().primaryKey().defaultRandom(),
    courseId: uuid()
        .notNull()
        .references(() => courseTable.id, {onDelete: 'cascade'}),
    title: varchar({ length: 50 }).notNull(),
    description: text().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

export const lectureTable = pgTable('lecture_table', {
    id: uuid().primaryKey().defaultRandom(),
    sectionId: uuid()
        .notNull()
        .references(() => sectionsTable.id, {onDelete: 'cascade'}),
    title: varchar({ length: 50 }).notNull(),
    description: text().notNull(),
    videoLink: text().notNull(),
    arr: json().default([]),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});
