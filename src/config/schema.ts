import { integer, pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
export const usersTable = pgTable('users_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});
