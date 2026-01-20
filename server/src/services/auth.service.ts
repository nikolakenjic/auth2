import UserModel from '../models/user.model';
import VerificationCodeModel from '../models/verificationCode.model';
import VerificationCodeTypes from '../constants/verificationCodeTypes';
import {fiveMinutesAgo, ONE_DAY_MS, oneHourFromNow, oneYearFromNow, thirtyDaysFromNow,} from '../utils/date';
import SessionModel from '../models/session.model';
import appAssert from '../utils/appAssert';
import {
    BAD_REQUEST,
    CONFLICT,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    TOO_MANY_REQUESTS,
    UNAUTHORIZED,
} from '../constants/http';
import {
    RefreshTokenPayload,
    refreshTokenSignOptions,
    signToken,
    verifyToken,
} from '../utils/jwt';
import {AuthCredentials, ResetPasswordParams} from '../types/auth.types';
import {sendMail} from '../utils/sendMail';
import {APP_ORIGIN, GOOGLE_CLIENT_ID} from '../constants/env';
import {getPasswordResetTemplate, getVerifyEmailTemplate,} from '../utils/emailTemplates';
import {hashValue} from '../utils/bcrypt';
import {OAuth2Client} from 'google-auth-library'
import AppErrorCode from "../constants/appErrorCode";
import {createSessionAndTokens} from "../utils/auth";

const client = new OAuth2Client(GOOGLE_CLIENT_ID)

export const createAccount = async (data: AuthCredentials) => {
    //  verify existing user does not exist
    const existingUser = await UserModel.exists({email: data.email});
    appAssert(!existingUser, CONFLICT, 'Email already exists', AppErrorCode.ValidationError);

    //  create user
    const user = await UserModel.create({
        email: data.email,
        password: data.password,
    });

    // create verification code
    const verificationCode = await VerificationCodeModel.create({
        userId: user._id,
        type: VerificationCodeTypes.EmailVerification,
        expiresAt: oneYearFromNow(),
    });

    const url = `${APP_ORIGIN}/email/verify/${verificationCode._id}`;
    // send verification email
    await sendMail({
        to: user.email,
        ...getVerifyEmailTemplate(url),
    });

    const {accessToken, refreshToken} = await createSessionAndTokens(user._id as string)

    // return user and tokens
    return {user, accessToken, refreshToken};
};

export const loginUser = async ({email, password}: AuthCredentials) => {
    //     get validation by email
    const user = await UserModel.findOne({email}).select('+password');
    appAssert(user, UNAUTHORIZED, 'Invalid email or password');

    //     check if email is verified
    appAssert(
        user.verified,
        UNAUTHORIZED,
        'You must verify your email before logging in'
    );

    //     validate password from the request
    const isValid = await user.comparePassword(password);
    appAssert(isValid, UNAUTHORIZED, 'Invalid email or password');

    const {accessToken, refreshToken} = await createSessionAndTokens(user._id as string)

    //     return user
    return {user, accessToken, refreshToken};
};

export const refreshUserAccessToken = async (refreshToken: string) => {
    const {payload} = verifyToken<RefreshTokenPayload>(refreshToken, {
        secret: refreshTokenSignOptions.secret,
    });
    appAssert(payload, UNAUTHORIZED, 'Invalid refresh token');

    const now = Date.now();

    const session = await SessionModel.findById(payload.sessionId);
    appAssert(
        session && session.expiresAt.getTime() > now,
        UNAUTHORIZED,
        'Session expired'
    );

    //     Refresh the session if it expires in the next 24 hours
    const sessionNeedRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;
    if (sessionNeedRefresh) {
        session.expiresAt = thirtyDaysFromNow();
        await session.save();
    }

    const newRefreshToken = sessionNeedRefresh
        ? signToken({sessionId: session._id}, refreshTokenSignOptions)
        : undefined;

    const accessToken = signToken({
        userId: session.userId,
        sessionId: session._id,
    });

    return {accessToken, newRefreshToken};
};

export const verifyEmail = async (code: string) => {
    //     get the verification code
    const validCode = await VerificationCodeModel.findOne({
        _id: code,
        type: VerificationCodeTypes.EmailVerification,
        expiresAt: {$gt: new Date()},
    });
    appAssert(validCode, NOT_FOUND, 'Invalid or expired verification code');

    //     update user to verified true
    const updateUser = await UserModel.findByIdAndUpdate(
        validCode.userId,
        {verified: true},
        {new: true}
    );
    appAssert(updateUser, INTERNAL_SERVER_ERROR, 'Failed to verify email');
    //     delete verification code
    await validCode.deleteOne();

    //     return user
    return {user: updateUser};
};

export const resendVerifyEmail = async (email: string) => {
    // console.log('email', email);
    const user = await UserModel.findOne({email});
    appAssert(user, NOT_FOUND, 'User not found');

    //      if email is already verified
    appAssert(!user.verified, BAD_REQUEST, 'Email is already verified');

    //      Delete old verification codes
    await VerificationCodeModel.deleteMany({
        userId: user._id,
        type: VerificationCodeTypes.EmailVerification,
    });

    //      create new verification code
    const verificationCode = await VerificationCodeModel.create({
        userId: user._id,
        type: VerificationCodeTypes.EmailVerification,
        expiresAt: oneYearFromNow(),
    });

    const url = `${APP_ORIGIN}/email/verify/${verificationCode._id}`;
    //      send verification email
    await sendMail({
        to: user.email,
        ...getVerifyEmailTemplate(url),
    });
};

export const sendPasswordResetEmail = async (email: string) => {
    //     get the user by email
    const user = await UserModel.findOne({email});
    appAssert(user, NOT_FOUND, 'User not found');

    //     check email rate limit
    const fiveMinAgo = fiveMinutesAgo();
    const count = await VerificationCodeModel.countDocuments({
        userId: user._id,
        type: VerificationCodeTypes.PasswordReset,
        createdAt: {$gt: fiveMinAgo},
    });
    appAssert(
        count <= 1,
        TOO_MANY_REQUESTS,
        'Too many requests, please try again later'
    );

    //     create verification code
    const expiresAt = oneHourFromNow();
    const verificationCode = await VerificationCodeModel.create({
        userId: user._id,
        type: VerificationCodeTypes.PasswordReset,
        expiresAt,
    });

    //     send email verification
    const url = `${APP_ORIGIN}/reset-password?code=${verificationCode._id}&exp=${expiresAt.getTime()}`;

    const {data, error} = await sendMail({
        to: user.email,
        ...getPasswordResetTemplate(url),
    });
    appAssert(
        data?.id,
        INTERNAL_SERVER_ERROR,
        `${error?.name} - ${error?.message}`
    );

    //     return success
    return {url, emailId: data.id};
};

export const resetPassword = async ({
                                        password,
                                        verificationCode,
                                    }: ResetPasswordParams) => {
    // get the verification code
    const validCode = await VerificationCodeModel.findOne({
        _id: verificationCode,
        type: VerificationCodeTypes.PasswordReset,
        expiresAt: {$gt: new Date()},
    });
    appAssert(validCode, NOT_FOUND, 'Invalid or expired verification code');

    //     update the user password
    const updateUser = await UserModel.findByIdAndUpdate(validCode.userId, {
        password: await hashValue(password),
    });
    appAssert(updateUser, INTERNAL_SERVER_ERROR, 'Faild to reset password');

    //     delete the verification code
    await validCode.deleteOne();

    //     delete all sessions
    await SessionModel.deleteMany({userId: validCode.userId});

    //     return value
    return {user: updateUser};
};

// Google Auth
export const googleLoginOrRegister = async (googleToken: string) => {
    // Verify token with google
    const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload();
    if (!payload) {
        appAssert(false, UNAUTHORIZED, 'Invalid Google token');
    }

    const {email, name, picture, sub: googleId} = payload;

//   Find existing user by email
    let user = await UserModel.findOne({email});

    if (!user) {
        user = await UserModel.create({
            email,
            name,
            googleId,
            verified: true,
            isOAuth: true,
            profileImg: picture,
        });
    }

    const {accessToken, refreshToken} = await createSessionAndTokens(user._id as string);

    return {user, accessToken, refreshToken}
};
