import z from "zod";

// --- items ---
const experienceItemSchema = z.object({
    company: z.string().min(1, "Company is required"),
    title: z.string().min(1, "Title is required"),
    location: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    bullets: z.array(z.string().min(1)).default([]),
});

const educationItemSchema = z.object({
    school: z.string().min(1, "School is required"),
    degree: z.string().optional(),
    field: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    details: z.array(z.string().min(1)).default([]),
});

// --- section schemas ---
const summarySectionSchema = z.object({
    type: z.literal("summary"),
    content: z.object({
        text: z.string().default(""),
    }),
});

const experienceSectionSchema = z.object({
    type: z.literal("experience"),
    content: z.object({
        items: z.array(experienceItemSchema).default([]),
    }),
});

const educationSectionSchema = z.object({
    type: z.literal("education"),
    content: z.object({
        items: z.array(educationItemSchema).default([]),
    }),
});

const skillsSectionSchema = z.object({
    type: z.literal("skills"),
    content: z.object({
        items: z.array(z.string().min(1)).default([]),
    }),
});

const sectionSchema = z.discriminatedUnion('type', [
    summarySectionSchema,
    experienceSectionSchema,
    educationSectionSchema,
    skillsSectionSchema,
])

// ---- create/update ---- //
export const createResumeSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    status: z.enum(['draft', 'complete']).optional(),
    templateVersion: z.number().int().positive().optional(),
    sections: z
        .array(sectionSchema)
        .min(1, 'At least one section is required')
        .optional()
})

export const updateResumeSchema = createResumeSchema.partial();

export type CreateResumeInput = z.infer<typeof createResumeSchema>;
export type UpdateResumeInput = z.infer<typeof updateResumeSchema>;