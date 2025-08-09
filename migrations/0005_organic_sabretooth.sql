CREATE TABLE "user_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" varchar(255) DEFAULT '' NOT NULL,
	"username" varchar(500) DEFAULT '',
	"email" varchar(255),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"provider" varchar(255) DEFAULT '' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lecture_table" DROP CONSTRAINT "lecture_table_sectionId_sections_table_id_fk";
--> statement-breakpoint
ALTER TABLE "sections_table" DROP CONSTRAINT "sections_table_courseId_course_table_id_fk";
--> statement-breakpoint
ALTER TABLE "course_table" ADD COLUMN "thumbnail" text DEFAULT 'link';--> statement-breakpoint
ALTER TABLE "course_table" ADD CONSTRAINT "course_table_instructorId_user_table_userId_fk" FOREIGN KEY ("instructorId") REFERENCES "public"."user_table"("userId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lecture_table" ADD CONSTRAINT "lecture_table_sectionId_sections_table_id_fk" FOREIGN KEY ("sectionId") REFERENCES "public"."sections_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sections_table" ADD CONSTRAINT "sections_table_courseId_course_table_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."course_table"("id") ON DELETE cascade ON UPDATE no action;