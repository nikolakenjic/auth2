import UserModel from '../models/user.model';
import VerificationCodeModel from "../models/verificationCode.model";
import VerificationCodeTypes from "../constants/verificationCodeTypes";
import {ONE_DAY_MS, oneYearFromNow, thirtyDaysFromNow} from "../utils/date";
import sessionModel from "../models/session.model";
import appAssert from "../utils/appAssert";
import {CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED} from "../constants/http";
import SessionModel from "../models/session.model";
import {
    accessTokenSignOptions,
    RefreshTokenPayload,
    refreshTokenSignOptions,
    signToken,
    verifyToken
} from "../utils/jwt";
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
    const refreshToken = signToken(
        {sessionId: session._id},
        refreshTokenSignOptions
    )


    const accessToken = signToken(
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
    const refreshToken = signToken(
        {sessionId: session._id},
        refreshTokenSignOptions
    )


    const accessToken = signToken(
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

export const refreshUserAccessToken = async (refreshToken: string) => {
    const {payload} = verifyToken<RefreshTokenPayload>(refreshToken, {
        secret: refreshTokenSignOptions.secret
    })
    appAssert(payload, UNAUTHORIZED, 'Invalid refresh token')

    const now = Date.now()

    const session = await SessionModel.findById(payload.sessionId)
    appAssert(session && session.expiresAt.getTime() > now, UNAUTHORIZED, 'Session expired')

//     Refresh the session if it expires in the next 24 hours
    const sessionNeedRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS
    if (sessionNeedRefresh) {
        session.expiresAt = thirtyDaysFromNow()
        await session.save()
    }


    const newRefreshToken = sessionNeedRefresh
        ? signToken(
            {sessionId: session._id},
            refreshTokenSignOptions
        ) : undefined

    const accessToken = signToken({
        userId: session.userId,
        sessionId: session._id
    })

    return {
        accessToken,
        newRefreshToken
    }
}

export const verifyEmail = async (code: string) => {
//     get the verification code
    const validCode = await VerificationCodeModel.findOne({
        _id: code,
        type: VerificationCodeTypes.EmailVerification,
        expiresAt: {$gt: new Date()}
    })
    appAssert(validCode, NOT_FOUND, 'Invalid or expired verification code')

//     update user to verified true
    const updateUser = await UserModel.findByIdAndUpdate(
        validCode.userId,
        {verified: true},
        {new: true}
    )
    appAssert(updateUser, INTERNAL_SERVER_ERROR, 'Failed to verify email')
//     delete verification code
    await validCode.deleteOne()

//     return user
    return {
        user: updateUser,
    }
}