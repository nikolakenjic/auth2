import { z } from "zod";

export const SectionSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, "Section title is required"),
    content: z.string().min(1, "Section content is required"),
});

export const ResumeSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    sections: z.array(SectionSchema).default([]),
});

export type ResumeType = z.infer<typeof ResumeSchema>;
export type SectionType = z.infer<typeof SectionSchema>;
