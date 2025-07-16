import mongoose from 'mongoose';
import { hashValue, compareValue } from '../utils/bcrypt';

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  verified: boolean;
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
    },
    password: { type: String, required: [true, 'Password is required'] },
    verified: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await hashValue(this.password);
  next();
});

userSchema.methods.comparePassword = async function (value: string) {
  return await compareValue(value, this.password);
};

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
