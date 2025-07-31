import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import Response from "@/helpers/Response";
import { sectionSchema } from "@/helpers/validators/sectionSchema";
import { db } from "@/config/db";
import { sectionsTable } from "@/config/schema";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const user = (await currentUser());
    if (!user) {
        return Response.error(null, "Unauthorized", 401);
    }
    const dataToBeSaved = {
        title: body.title,
        description: body.description,
        courseId: body.courseId,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    try {
        const safeResult = sectionSchema.safeParse(dataToBeSaved);
        if (!safeResult.success) {
            return Response.error(safeResult.error, "Invalid data", 400);
        }
        const result = await db.insert(sectionsTable).values(safeResult.data).returning();
        return Response.success(result[0], "Section created successfully", 201);
    } catch (error) {
        return Response.error(error, "Internal Server Error", 500);
    }
}