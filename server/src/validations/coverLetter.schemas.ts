import { z } from "zod";

export const createCoverLetterSchema = z.object({
    title: z.string(),
    resumeId: z.string().optional(),
    content: z.string(),
});

export const updateCoverLetterSchema = z.object({
    title: z.string().optional(),
    resumeId: z.string().optional(),
    content: z.string().optional(),
});
