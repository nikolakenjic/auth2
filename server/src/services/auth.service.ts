import UserModel from '../models/user.model';
import VerificationCodeModel from "../models/verificationCode.model";
import VerificationCodeTypes from "../constants/verificationCodeTypes";
import {oneYearFromNow} from "../utils/date";
import sessionModel from "../models/session.model";
import appAssert from "../utils/appAssert";
import {CONFLICT, UNAUTHORIZED} from "../constants/http";
import SessionModel from "../models/session.model";
import {accessTokenSignOptions, refreshTokenSignOptions, sighToken} from "../utils/jwt";
import {AuthCredentials} from "../types/auth.types";


export const createAccount = async (data: AuthCredentials) => {
    //  verify existing user does not exist
    const existingUser = await UserModel.exists({email: data.email});

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
    const refreshToken = sighToken(
        {sessionId: session._id},
        refreshTokenSignOptions
    )


    const accessToken = sighToken(
        {userId: user._id, sessionId: session._id},
        accessTokenSignOptions
    )


    // return user and tokens
    return {
        user,
        accessToken,
        refreshToken,
    }
};


export const loginUser = async ({email, password}: AuthCredentials) => {
//     get validation by email
    const user = await UserModel.findOne({email})
    appAssert(user, UNAUTHORIZED, 'Invalid email or password')

//     validate password from the request
    const isValid = await user.comparePassword(password)
    appAssert(isValid, UNAUTHORIZED, 'Invalid email or password')

//     create a session
    const session = await SessionModel.create({
        userId: user._id
    })

//     sign access and refresh token
    const refreshToken = sighToken(
        {sessionId: session._id},
        refreshTokenSignOptions
    )


    const accessToken = sighToken(
        {userId: user._id, sessionId: session._id},
        accessTokenSignOptions
    )


//     return user
    return {
        user,
        accessToken,
        refreshToken,
    }
}
