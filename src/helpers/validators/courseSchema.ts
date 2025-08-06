import * as z from 'zod';

export const courseSchema = z.object({
    title: z.string().max(50),
    description: z.string(),
    instructorId: z.string(),
    thumbnail: z.string(),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
});
