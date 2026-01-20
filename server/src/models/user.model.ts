import mongoose from 'mongoose';
import {hashValue, compareValue} from '../utils/bcrypt';

export interface UserDocument extends mongoose.Document {
    email: string;
    password?: string;
    verified: boolean;
    role: string;
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
            required: function () {
                return !this.isOAuth;
            },
            select: false
        },
        verified: {
            type: Boolean,
            default: false,
            required: true,
        },
        role: {
            type: String,
            required: true,
            default: 'user'
        },
        name: {
            type: String,
        },
        googleId: {
            type: String,
            select: false
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

// Hashed Password before saving
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

// Remove sensitive fields for API responses
const transformResponse = (doc: any, ret: any) => {
    delete ret.password;
    delete ret.__v;
    delete ret.googleId;

    return ret;
}

userSchema.set('toJSON', {
    transform: transformResponse,
});

userSchema.set('toObject', {
    transform: transformResponse,
})


const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
