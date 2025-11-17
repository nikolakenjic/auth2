import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export interface ResumeDocument extends mongoose.Document {
    userId: ObjectId;
    title: string;
    sections: {
        type: 'experience' | 'education' | 'skills' | 'projects' | 'other';
        content: any;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

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
        sections: [
            {
                type: {
                    type: String,
                    enum: ['experience', 'education', 'skills', 'projects', 'other'],
                    required: true,
                },
                content: {
                    type: mongoose.Schema.Types.Mixed, // flexible content
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

const ResumeModel = mongoose.model<ResumeDocument>('Resume', resumeSchema);

export default ResumeModel;
