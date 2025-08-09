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
ALTER TABLE "course_table" ALTER COLUMN "instructorId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "course_table" ADD CONSTRAINT "course_table_instructorId_user_table_id_fk" FOREIGN KEY ("instructorId") REFERENCES "public"."user_table"("id") ON DELETE cascade ON UPDATE no action;