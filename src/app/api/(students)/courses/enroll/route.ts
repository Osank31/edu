import { db } from "@/config/db";
import { courseTable } from "@/config/schema";
import Response from "@/helpers/Response";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { courseId }: { courseId: string; } = await request.json();
    const user = await currentUser();
    if (!user) {
        return Response.error(null, "Unauthorized", 401);
    }
    try {
        const course  = await db.select({studentsId: courseTable.studentsId}).from(courseTable).where(eq(courseTable.id, courseId)).then(rows => rows[0])

        if (!course) {
            return Response.error(null, "Course not found", 404);
        }

        const updatedStudentsId = [...course?.studentsId ?? [], user.id];

        await db.update(courseTable).set({studentsId: updatedStudentsId}).where(eq(courseTable.id, courseId));

        return Response.success(null, "Successfully enrolled in the course", 200);

    } catch (error) {
        return Response.error(null, "Failed to enroll in the course. Please try again later.", 500);
    }
}