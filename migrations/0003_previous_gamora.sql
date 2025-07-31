CREATE TABLE "lecture_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sectionId" uuid NOT NULL,
	"title" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"videoLink" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sections_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"courseId" uuid NOT NULL,
	"title" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "course_table" ALTER COLUMN "title" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "lecture_table" ADD CONSTRAINT "lecture_table_sectionId_sections_table_id_fk" FOREIGN KEY ("sectionId") REFERENCES "public"."sections_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sections_table" ADD CONSTRAINT "sections_table_courseId_course_table_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."course_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_table" DROP COLUMN "sections";