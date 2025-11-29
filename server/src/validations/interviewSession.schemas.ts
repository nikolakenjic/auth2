import z from "zod";

export const createInterviewSessionSchema = z.object({
    role: z.string().min(1, "Role is required"),
    level: z.enum(["junior", "mid", "senior"]).optional(),
    questions: z.array(z.string()).optional().default([]),
    answers: z.array(z.string()).optional().default([]),
    feedback: z.string().optional(),
});

export const updateInterviewSessionSchema = createInterviewSessionSchema.partial();

export type CreateInterviewSessionInput = z.infer<typeof createInterviewSessionSchema>;
export type UpdateInterviewSessionInput = z.infer<typeof updateInterviewSessionSchema>;
