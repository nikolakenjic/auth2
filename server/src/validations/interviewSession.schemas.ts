import { z } from "zod";

const interviewMessageSchema = z.object({
    question: z.string().min(1, "Question is required"),
    answer: z.string().optional(),
    feedback: z.string().optional(),
    createdAt: z.string().optional(),
});

export const createInterviewSessionSchema = z.object({
    role: z.string().min(1, "Role is required"),
    level: z.enum(["junior", "mid", "senior"]).optional(),

    messages: z.array(interviewMessageSchema).optional(),
    overallFeedback: z.string().optional(),
    status: z.enum(["in_progress", "completed"]).optional(),
    endedAt: z.string().optional(),
});

export const updateInterviewSessionSchema = createInterviewSessionSchema.partial();

export type CreateInterviewSessionInput = z.infer<typeof createInterviewSessionSchema>;
export type UpdateInterviewSessionInput = z.infer<typeof updateInterviewSessionSchema>;
