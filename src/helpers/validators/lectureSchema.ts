import * as z from "zod"; 

export const lectureSchema = z.object({ 
    sectionId: z.string().uuid(),
    title: z.string().max(50),
    description: z.string(),
    videoLink: z.string().url(),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date())
});