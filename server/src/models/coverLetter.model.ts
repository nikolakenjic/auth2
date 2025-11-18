import mongoose from 'mongoose';

export interface CoverLetterDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    resumeId?: mongoose.Types.ObjectId;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const coverLetterSchema = new mongoose.Schema<CoverLetterDocument>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        resumeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resume',
        },
        title: {
            type: String,
            required: [true, 'Cover letter title is required'],
            trim: true,
        },
        content: {
            type: String,
            required: [true, 'Cover letter content is required'],
        },
    },
    {timestamps: true}
);

const CoverLetterModel = mongoose.model<CoverLetterDocument>('CoverLetter', coverLetterSchema);

export default CoverLetterModel;
