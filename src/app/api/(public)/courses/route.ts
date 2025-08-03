import { NextRequest } from "next/server";
import Response from "@/helpers/Response";
import { courseTable, lectureTable, sectionsTable } from "@/config/schema";
import { desc, eq, asc, inArray } from "drizzle-orm";
import { db } from "@/config/db";
import { currentUser } from "@clerk/nextjs/server";


async function getCoursesWithSectionsAndLectures(courseId: string) {
  // 1. Fetch the course(s) by courseId or all courses if courseId is 'all'
  const courses = await db
    .select()
    .from(courseTable)
    .where(courseId === 'all' ? undefined : eq(courseTable.id, courseId))
    .orderBy(desc(courseTable.createdAt));

  if (courses.length === 0) return [];

  // 2. Fetch sections for the course(s)
  const courseIds = courses.map(c => c.id);
  const sections = await db
    .select()
    .from(sectionsTable)
    .where(courseId === 'all' ? inArray(sectionsTable.courseId, courseIds) : eq(sectionsTable.courseId, courseId))
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

  // 5. Nest sections into courses
  const coursesWithSections = courses.map(course => ({
    ...course,
    sections: sectionsWithLectures.filter(section => section.courseId === course.id),
  }));

  return coursesWithSections;
}


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("id");
  if (!courseId) {
    return Response.error(null, "Course ID is required", 400);
  }
  try {
    const courses = await getCoursesWithSectionsAndLectures(courseId);

    // If courseId is 'all', return all courses, otherwise return the first course
    if (courseId === 'all') {
      const user = await currentUser();
      if (!user) {
        return Response.error(null, "Unauthorized", 401);
      }

      // Ensure the user is authorized to view all courses
      // This could be a check against user roles or permissions
      // For now, we assume the user is authorized if they are logged in
      return Response.success(courses, "Courses fetched successfully", 200);
    } else {
      return Response.success(courses[0], "Course fetched successfully", 200);
    }
  } catch (error) {
    return Response.error(error, "Internal Server Error", 500);
  }
}