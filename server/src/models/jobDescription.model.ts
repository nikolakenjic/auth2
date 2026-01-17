import mongoose from "mongoose";

export interface JobDescriptionDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    title?: string;
    text: string;
    keywords: string[];
    missingSkills: string[];
    matchScore?: number;
}

const jobDescriptionSchema = new mongoose.Schema<JobDescriptionDocument>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
            index: true,
        },
        title: {
            type: String,
            trim: true,
        },
        text: {
            type: String,
            required: [true, "Job description text is required"],
        },
        keywords: {
            type: [String],
            default: [],
            required: true,
        },
        missingSkills: {
            type: [String],
            default: [],
            required: true,
        },
        matchScore: {
            type: Number,
            min: 0,
            max: 100,
        },
    },
    {timestamps: true}
)

jobDescriptionSchema.index({userId: 1, createdAt: -1})

const JobDescriptionModel = mongoose.model<JobDescriptionDocument>(
    'JobDescription',
    jobDescriptionSchema
)

export default JobDescriptionModel;