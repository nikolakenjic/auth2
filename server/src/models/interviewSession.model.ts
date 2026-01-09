import mongoose from 'mongoose';

export interface InterviewMessage {
    question: string;
    answer?: string;
    feedback?: string;
    createdAt: Date;
}

export interface InterviewSessionDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    role: string;
    level?: string;
    messages: InterviewMessage[];
    overallFeedback?: string;
    createdAt: Date;
    updatedAt: Date;
}

const interviewMessageSchema = new mongoose.Schema<InterviewMessage>(
    {
        question: {type: String, required: true},
        answer: {type: String},
        feedback: {type: String},
        createdAt: {type: Date, default: Date.now},
    },
    {_id: false}
);

const interviewSessionSchema = new mongoose.Schema<InterviewSessionDocument>(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        role: {type: String, required: [true, "Role is required"]},
        level: {type: String, enum: ["junior", "mid", "senior"]},
        messages: {type: [interviewMessageSchema], default: []},
        overallFeedback: {type: String},
    },
    {timestamps: true}
);

const InterviewSessionModel = mongoose.model<InterviewSessionDocument>(
    'InterviewSession',
    interviewSessionSchema
);

export default InterviewSessionModel;
