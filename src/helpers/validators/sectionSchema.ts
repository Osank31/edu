import * as z from 'zod';

export const sectionSchema = z.object({
    title: z.string().max(50),
    description: z.string(),
    courseId: z.string().uuid(),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
});
