import { NextRequest } from "next/server";
import Response from "@/helpers/Response";
import { courseTable, lectureTable, sectionsTable } from "@/config/schema";
import { desc, eq, asc, inArray } from "drizzle-orm";
import { db } from "@/config/db";


async function getCoursesWithSectionsAndLectures(courseId: string) {
  // 1. Fetch the course by courseId
  const courses = await db
    .select()
    .from(courseTable)
    .where(eq(courseTable.id, courseId))
    .orderBy(desc(courseTable.createdAt));

  if (courses.length === 0) return [];

  // 2. Fetch sections for the course
  const sections = await db
    .select()
    .from(sectionsTable)
    .where(eq(sectionsTable.courseId, courseId))
    .orderBy(asc(sectionsTable.createdAt));

  // 3. Fetch lectures for those sections
  const sectionIds = sections.map(s => s.id);
  const lectures = await db
    .select()
    .from(lectureTable)
    .where(inArray(lectureTable.sectionId, sectionIds))
    .orderBy(asc(lectureTable.createdAt));

  // 4. Nest lectures into sections
  const sectionsWithLectures = sections.map(section => ({
    ...section,
    lectures: lectures.filter(lec => lec.sectionId === section.id),
  }));

  // 5. Nest sections into course
  const coursesWithSections = courses.map(course => ({
    ...course,
    sections: sectionsWithLectures,
  }));

  return coursesWithSections;
}


export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const courseId = searchParams.get("id");
    if (!courseId) {
        return Response.error(null, "Course ID is required", 400);
    }
    try {
        const courses = await getCoursesWithSectionsAndLectures(courseId);
        return Response.success(courses[0], "Courses fetched successfully", 200);
    } catch (error) {
        return Response.error(error, "Internal Server Error", 500);
    }
}