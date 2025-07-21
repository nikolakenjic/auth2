import mongoose from 'mongoose';
import VerificationCodeTypes from '../constants/verificationCodeTypes';

export interface VerificationCodeDocument extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId;
    type: VerificationCodeTypes;
    expiresAt: Date;
    createdAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    type: {type: String, required: true},
    expiresAt: {type: Date, required: true},
    createdAt: {type: Date, required: true, default: Date.now},
});

verificationCodeSchema.index({expiresAt: 1}, {expireAfterSeconds: 0});

const VerificationCodeModel = mongoose.model<VerificationCodeDocument>(
    'VerificationCode',
    verificationCodeSchema,
    'verification_codes'
);

export default VerificationCodeModel;
