import {z} from 'zod';

export const createJobDescriptionSchema = z.object({
    title: z.string().min(1).optional(),
    text: z.string().min(1, 'Job Description text is required'),

    // AI output
    keywords: z.array(z.string().min(1)).optional(),
    missingSkills: z.array(z.string().min(1)).optional(),
    matchScore: z.number().min(0).max(100).optional(),
})

export const updateJobDescriptionSchema = createJobDescriptionSchema.partial()

export type CreateJobDescriptionInput = z.infer<typeof createJobDescriptionSchema>;
export type UpdateJobDescriptionInput = z.infer<typeof updateJobDescriptionSchema>;