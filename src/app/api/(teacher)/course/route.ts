import { currentUser, User } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import Response from '@/helpers/Response';
import { courseSchema } from '@/helpers/validators/courseSchema';
import { db } from '@/config/db';
import { courseTable, sectionsTable, lectureTable } from '@/config/schema';
import { and, asc, desc, eq, inArray } from 'drizzle-orm';

async function getCoursesWithSectionsAndLectures(user: User, courseId?: string) {
    // 1. Fetch courses for instructor, optionally filter by courseId
    const courseWhereClause = courseId
        ? and(eq(courseTable.instructorId, user.id), eq(courseTable.id, courseId))
        : eq(courseTable.instructorId, user.id);

    const courses = await db
        .select()
        .from(courseTable)
        .where(courseWhereClause)
        .orderBy(desc(courseTable.createdAt));

    if (courses.length === 0) return [];

    // 2. Fetch sections for those courses
    const courseIds = courses.map((c) => c.id);
    const sections = await db
        .select()
        .from(sectionsTable)
        .where(inArray(sectionsTable.courseId, courseIds))
        .orderBy(asc(sectionsTable.createdAt));

    // 3. Fetch lectures for those sections
    const sectionIds = sections.map((s) => s.id);
    const lectures = await db
        .select()
        .from(lectureTable)
        .where(inArray(lectureTable.sectionId, sectionIds))
        .orderBy(asc(lectureTable.createdAt));

    // 4. Nest lectures into sections
    const sectionsWithLectures = sections.map((section) => ({
        ...section,
        lectures: lectures.filter((lec) => lec.sectionId === section.id),
    }));

    // 5. Nest sections into courses
    const coursesWithSections = courses.map((course) => ({
        ...course,
        sections: sectionsWithLectures.filter((section) => section.courseId === course.id),
    }));

    return coursesWithSections;
}

export async function GET(req: NextRequest) {
    const user = await currentUser();
    // const user = {id: 'user123'}
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    if (!user) {
        return Response.error(null, 'Unauthorized', 401);
    }
    if (!courseId) {
        return Response.error(null, 'Course ID is required', 400);
    }
    if (courseId === 'all') {
        try {
            const result = await getCoursesWithSectionsAndLectures(user);
            return Response.success(result, 'Courses retrieved successfully', 200);
        } catch (error) {
            return Response.error(error, 'Internal Server Error', 500);
        }
    } else {
        try {
            const result = await getCoursesWithSectionsAndLectures(user, courseId);

            if (result.length === 0) {
                return Response.error(null, 'Course not found', 404);
            }
            return Response.success(result[0], 'Course retrieved successfully', 200);
        } catch (error) {
            return Response.error(error, 'Internal Server Error', 500);
        }
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const user = await currentUser();
    // const user = {id: 'user123'}

    if (!user) {
        return Response.error(null, 'Unauthorized', 401);
    }

    const dataToBeSaved = {
        title: body.title,
        description: body.description,
        instructorId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    try {
        const safeResult = courseSchema.safeParse(dataToBeSaved);

        if (!safeResult.success) {
            return Response.error(safeResult.error, 'Validation Error', 400);
        }

        const result = await db.insert(courseTable).values(safeResult.data).returning();

        return Response.success(result[0], 'Course created successfully', 201);
    } catch (error) {
        return Response.error(error, 'Internal Server Error', 500);
    }
}
