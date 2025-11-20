import z from "zod";

const sectionSchema = z.object({
    type: z.enum(["experience", "education", "skills", "projects", "other"]),
    content: z.any()
})

export const createResumeSchema = z.object({
    title: z.string().min(1, "Title is required"),
    sections: z.array(sectionSchema).min(1, "At least one section is required"),
});

export const updateResumeSchema = createResumeSchema.partial()