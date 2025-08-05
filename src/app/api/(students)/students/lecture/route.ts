import { db } from '@/config/db';
import { lectureTable } from '@/config/schema';
import Response from '@/helpers/Response';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const user = await currentUser();
    if (!user) {
        return Response.error(null, 'Unauthorized', 401);
    }

    const { searchParams } = new URL(req.url);
    const lectureId = searchParams.get('id');

    if (!lectureId) {
        return Response.error(null, 'Lecture ID is required', 400);
    }

    try {
        const result = await db.select().from(lectureTable).where(eq(lectureTable.id, lectureId));

        return Response.success(result[0], 'Lecture retrieved successfully', 200);
    } catch (error) {
        console.error('Error retrieving lecture:', error);
        return Response.error(null, 'Failed to retrieve lecture', 500);
    }
}
