import UserModel from '../models/user.model';
import VerificationCodeModel from "../models/verificationCode.model";
import VerificationCodeTypes from "../constants/verificationCodeTypes";
import {oneYearFromNow} from "../utils/date";
import sessionModel from "../models/session.model";
import jwt from 'jsonwebtoken';
import {JWT_REFRESH_SECRET, JWT_SECRET} from "../constants/env";
import appAssert from "../utils/appAssert";
import {CONFLICT} from "../constants/http";

export type CreateAccountParams = {
    email: string;
    password: string;
};
export const createAccount = async (data: CreateAccountParams) => {
    //  verify existing user does not exist
    const existingUser = await UserModel.exists({email: data.email});

    // if (existingUser) throw new Error('User already exists');
    appAssert(!existingUser, CONFLICT, 'Email already exists');

    //  create user
    const user = await UserModel.create({
        email: data.email,
        password: data.password,
    });

    // create verification code
    const verificationCode = await VerificationCodeModel.create({
        userId: user._id,
        type: VerificationCodeTypes.EmailVerification,
        expiresAt: oneYearFromNow()
    })

    // send verification email

    // create session
    const session = await sessionModel.create({
        userId: user._id,
    })

    // sign access token and refresh token
    const refreshToken = jwt.sign(
        {sessionId: session._id},
        JWT_REFRESH_SECRET,
        {
            expiresIn: '30d'
        }
    )

    const accessToken = jwt.sign(
        {userId: user._id, sessionId: session._id},
        JWT_SECRET,
        {
            expiresIn: '15m'
        }
    )


    // return user and tokens
    return {
        user,
        accessToken,
        refreshToken,
    }
};
