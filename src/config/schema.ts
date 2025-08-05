import { pgTable, text, uuid, timestamp, json, varchar } from 'drizzle-orm/pg-core';
import { title } from 'process';

// {
//     courseTable: {
//         id : 'hjgushdgbcdshucgdsiuc',
//         title: 'Introduction to Programming',
//         description: 'A beginner-friendly course on programming concepts.',
//         instructorId: 'instructor-123',
//         studentsId: ['student-1', 'student-2'],
//         createdAt: '31-07-2025',
//         updatedAt: '31-07-2025'
//     },
//     sectionsTable: {
//         id: 'section-123',
//         courseId: 'hjgushdgbcdshucgdsiuc',
//         title: 'Getting Started with Programming',
//         description: 'An introduction to the basics of programming.',
//         createdAt: '31-07-2025',
//         updatedAt: '31-07-2025'
//     },
//     lectureTable: {
//         id: 'lecture-123',
//         sectionId: 'section-123',
//         title: 'Variables and Data Types',
//         description: 'Understanding variables and different data types in programming.',
//         videoLink: 'https://example.com/lecture-video',
//         createdAt: '31-07-2025',
//         updatedAt: '31-07-2025'
//     }
// }

export const courseTable = pgTable('course_table', {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 50 }).notNull(),
    description: text().notNull(),
    instructorId: varchar({ length: 255 }).notNull(),
    studentsId: varchar({ length: 255 }).array().default([]),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

export const sectionsTable = pgTable('sections_table', {
    id: uuid().primaryKey().defaultRandom(),
    courseId: uuid()
        .notNull()
        .references(() => courseTable.id),
    title: varchar({ length: 50 }).notNull(),
    description: text().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

export const lectureTable = pgTable('lecture_table', {
    id: uuid().primaryKey().defaultRandom(),
    sectionId: uuid()
        .notNull()
        .references(() => sectionsTable.id),
    title: varchar({ length: 50 }).notNull(),
    description: text().notNull(),
    videoLink: text().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});
