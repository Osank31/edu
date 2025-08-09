ALTER TABLE "user_table" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "user_table" CASCADE;--> statement-breakpoint
ALTER TABLE "course_table" DROP CONSTRAINT "course_table_instructorId_user_table_userId_fk";
