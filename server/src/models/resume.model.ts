import mongoose from 'mongoose';

export type ResumeSectionType = 'summary' | 'experience' | 'education' | 'skills';
export type ResumeStatus = 'draft' | 'complete';

export type ExperienceItem = {
    company: string;
    title: string;
    location?: string;
    startDate: string;
    endDate?: string;
    bullets: string[];
}

export type EducationItem = {
    school: string;
    degree?: string;
    field?: string;
    startDate?: string;
    endDate?: string;
    details: string[];
}

export interface ResumeSectionSummary {
    type: 'summary';
    content: { text: string };
}

export interface ResumeSectionExperience {
    type: 'experience';
    content: { items: ExperienceItem[] };
}

export interface ResumeSectionEducation {
    type: 'education';
    content: { items: EducationItem[] };
}

export interface ResumeSectionSkills {
    type: 'skills';
    content: { items: string[] };
}

export type ResumeSection =
    | ResumeSectionSummary
    | ResumeSectionExperience
    | ResumeSectionEducation
    | ResumeSectionSkills;

export interface ResumeDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    status: ResumeStatus;
    templateVersion: number;
    sections: ResumeSection[];
    createdAt: Date;
    updatedAt: Date;
}

// ------------ Subschemas ---------------- //
const experienceItemSchema = new mongoose.Schema<ExperienceItem>(
    {
        company: {type: String, required: true, trim: true},
        title: {type: String, required: true, trim: true},
        location: {type: String, trim: true},
        startDate: {type: String, required: true, trim: true},
        endDate: {type: String, trim: true},
        bullets: {type: [String], default: [], required: true},
    },
    {_id: false}
)

const educationItemSchema = new mongoose.Schema<EducationItem>(
    {
        school: {type: String, required: true, trim: true},
        degree: {type: String, trim: true},
        field: {type: String, trim: true},
        startDate: {type: String, trim: true},
        endDate: {type: String, trim: true},
        details: {type: [String], default: []},
    },
    {_id: false}
);

const summarySectionSchema = new mongoose.Schema(
    {
        type: {type: String, enum: ['summary'], required: true},
        content: {
            text: {type: String, default: "", required: true},
        },
    },
    {_id: false}
)

const experienceSectionSchema = new mongoose.Schema(
    {
        type: {type: String, enum: ["experience"], required: true},
        content: {
            items: {type: [experienceItemSchema], default: [], required: true},
        },
    },
    {_id: false}
);

const educationSectionSchema = new mongoose.Schema(
    {
        type: {type: String, enum: ["education"], required: true},
        content: {
            items: {type: [educationItemSchema], default: [], required: true},
        },
    },
    {_id: false}
);

const skillsSectionSchema = new mongoose.Schema(
    {
        type: {type: String, enum: ["skills"], required: true},
        content: {
            items: {type: [String], default: [], required: true},
        },
    },
    {_id: false}
);

const sectionsSchema = [
    summarySectionSchema,
    experienceSectionSchema,
    educationSectionSchema,
    skillsSectionSchema,
]

const resumeSchema = new mongoose.Schema<ResumeDocument>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Resume title is required'],
            trim: true,
        },
        status: {
            type: String,
            enum: ['draft', 'complete'],
            default: 'draft',
            required: [true, 'Resume status is required'],
        },
        templateVersion: {
            type: Number,
            default: 1,
            required: true,
        },
        sections: {
            type: sectionsSchema as any,
            default: [
                {type: 'summary', content: {text: ''}},
                {type: "experience", content: {items: []}},
                {type: "education", content: {items: []}},
                {type: "skills", content: {items: []}},
            ],
            required: [true, 'Resume section is required'],
        }
    },
    {timestamps: true}
);

const ResumeModel = mongoose.model<ResumeDocument>('Resume', resumeSchema);

export default ResumeModel;
