import mongoose from 'mongoose';

export interface InterviewSessionDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    role: string;
    level?: string;
    questions: string[];
    answers: string[];
    feedback?: string;
    createdAt: Date;
    updatedAt: Date;
}

const interviewSessionSchema = new mongoose.Schema<InterviewSessionDocument>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
        },
        level: {
            type: String,
            enum: ['junior', 'mid', 'senior'],
        },
        questions: {
            type: [String],
            default: [],
        },
        answers: {
            type: [String],
            default: [],
        },
        feedback: {
            type: String,
        },
    },
    {timestamps: true}
);

const InterviewSessionModel = mongoose.model<InterviewSessionDocument>(
    'InterviewSession',
    interviewSessionSchema
);

export default InterviewSessionModel;
