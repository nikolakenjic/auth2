import mongoose from 'mongoose';
import {hashValue, compareValue} from '../utils/bcrypt';

export interface UserDocument extends mongoose.Document {
    email: string;
    password?: string;
    verified: boolean;
    name?: string;
    googleId?: string;
    profileImg?: string;
    isOAuth?: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        verified: {
            type: Boolean,
            default: false,
            required: true,
        },
        name: {
            type: String,
        },
        googleId: {
            type: String,
        },
        profileImg: {
            type: String,
        },
        isOAuth: {
            type: Boolean,
            default: false,
        },
    },
    {timestamps: true}
);

userSchema.pre('save', async function (next) {
    if (this.isOAuth) return next();
    if (!this.isModified('password') || !this.password) return next();

    this.password = await hashValue(this.password);
    next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string) {
    if (!this.password) return false;
    return await compareValue(candidatePassword, this.password);
};

// Omit Password
userSchema.set('toJSON', {
    transform(doc, ret) {
        delete ret.password;
        return ret;
    }
});


const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
