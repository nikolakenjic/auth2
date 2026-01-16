import mongoose from "mongoose";

export type InterviewLevel = 'junior' | 'mid' | 'senior';
export type InterviewStatus = 'in_progress' | 'completed';

export interface InterviewMessage {
    question: string;
    answer?: string;
    feedback?: string;
    createdAt: Date;
}

export interface InterviewSessionDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    role: string;
    level?: InterviewLevel;
    status: InterviewStatus;
    messages: InterviewMessage[];
    overallFeedback?: string;
    endedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

// ----- Subschemas ------- //
const interviewMessageSchema = new mongoose.Schema(
    {
        question: {type: String, required: [true, 'question is required'], trim: true},
        answer: {type: String, trim: true},
        feedback: {type: String, trim: true},
        createdAt: {type: Date, default: Date.now},
    },
    {_id: false}
)

const interviewSessionSchema = new mongoose.Schema<InterviewSessionDocument>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
        },
        level: {
            type: String,
            enum: ['junior', 'mid', 'senior']
        },
        status: {
            type: String,
            enum: ['in_progress', 'completed'],
            default: 'in_progress'
        },
        messages: {
            type: [interviewMessageSchema],
            default: [],
            required: [true, 'message is required'],
        },
        overallFeedback: {
            type: String,
        },
        endedAt: {
            type: Date,
        }
    },
    {timestamps: true}
)

const InterviewSessionModel = mongoose.model<InterviewSessionDocument>('InterviewSession', interviewSessionSchema);
export default InterviewSessionModel;
