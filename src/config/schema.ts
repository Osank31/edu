import { pgTable, text, uuid, timestamp, json, varchar } from 'drizzle-orm/pg-core';

export const courseTable = pgTable('course_table', {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({length: 50}).notNull(),
    description: text().notNull(),
    instructorId: varchar({length: 255}).notNull(),
    studentsId: varchar({length: 255}).array().notNull(),
    sections: json().default([]).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull()
})