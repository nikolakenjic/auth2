import { z } from "zod";

export const createCoverLetterSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    resumeId: z.string().optional(),
    content: z.string().min(1, 'Content is required'),
});

export const updateCoverLetterSchema = createCoverLetterSchema.partial()

export type CreateCoverLetterInput = z.infer<typeof createCoverLetterSchema>
export type UpdateCoverLetterInput = z.infer<typeof updateCoverLetterSchema>
