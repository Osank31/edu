import { currentUser } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import Response from '@/helpers/Response';
import { db } from '@/config/db';
import { lectureTable } from '@/config/schema';
import { lectureSchema } from '@/helpers/validators/lectureSchema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const user = await currentUser(); // Mock user for testing, remove in production

    if (!user) {
        return Response.error(null, 'Unauthorized', 401);
    }

    const dataToBeSaved = {
        sectionId: body.sectionId,
        title: body.title,
        description: body.description,
        videoLink: body.videoLink,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    try {
        const safeResult = lectureSchema.safeParse(dataToBeSaved);
        if (!safeResult.success) {
            return Response.error(safeResult.error, 'Invalid data', 400);
        }
        await db.insert(lectureTable).values(safeResult.data).returning();
        return Response.success(safeResult.data, 'Lecture created successfully', 201);
    } catch (error) {
        return Response.error(error, 'Internal Server Error', 500);
    }
}

export async function GET(request: NextRequest) {
    const user = await currentUser(); // Mock user for testing, remove in production
    if (!user) {
        return Response.error(null, 'Unauthorized', 401);
    }
    const { searchParams } = new URL(request.url);

    const lectureId = searchParams.get('lectureId');
    if (!lectureId) {
        return Response.error(null, 'Lecture ID is required', 400);
    }

    try {
        const result = await db.select().from(lectureTable).where(eq(lectureTable.id, lectureId));

        return Response.success(result[0], 'Lecture retrieved successfully', 200);
    } catch (error) {
        return Response.error(error, 'Internal Server Error', 500);
    }
}
