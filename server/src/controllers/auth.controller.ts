import catchAsync from "../utils/catchAsync";
import {
    createAccount,
    loginUser,
    refreshUserAccessToken,
    sendPasswordResetEmail,
    verifyEmail
} from "../services/auth.service";
import {CREATED, OK, UNAUTHORIZED} from "../constants/http";
import {
    clearAuthCookies,
    getAccessTokenCookieOptions,
    getRefreshTokenCookieOptions,
    setAuthCookies
} from "../utils/cookies";
import {emailSchema, loginSchema, registerSchema, verificationCodeSchema} from "../validations/auth.schemas";
import {verifyToken} from "../utils/jwt";
import SessionModel from "../models/session.model";
import appAssert from "../utils/appAssert";

export const registerHandler = catchAsync(async (req, res, next) => {
// //    validate request
    const request = registerSchema.parse(req.body);
    // console.log(request)

//     call service
    const {user, accessToken, refreshToken} = await createAccount(request)

//     return response
    return setAuthCookies({res, accessToken, refreshToken}).status(CREATED).json({
        status: "success",
        user,
    })
})

export const loginHandler = catchAsync(async (req, res, next) => {
    // validate request
    const request = loginSchema.parse(req.body);

    // call service
    const {user, accessToken, refreshToken} = await loginUser(request)
    // return response

    return setAuthCookies({res, accessToken, refreshToken}).status(OK).json({
        status: 'success',
        user
    })
})

export const logoutHandler = catchAsync(async (req, res, next) => {
    const accessToken = req.cookies.accessToken as string | undefined
    const {payload} = verifyToken(accessToken || '')

    if(payload) {
        await SessionModel.findByIdAndDelete(payload.sessionId)
    }

    return clearAuthCookies(res).status(OK).json({
        status: 'success',
        message: 'Logged out',
    })
})

export const refreshHandler = catchAsync(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken as string | undefined
    appAssert(refreshToken, UNAUTHORIZED, 'Missing refresh token')

    const {accessToken, newRefreshToken} = await refreshUserAccessToken(refreshToken)

    if(newRefreshToken) {
        res.cookie('refreshToken', newRefreshToken, getRefreshTokenCookieOptions())
    }

    return res.status(OK).cookie('accessToken', accessToken, getAccessTokenCookieOptions()).json({
        status: 'success',
        message: 'Access token refreshed'
    })
})

export const emailVerifyHandler = catchAsync(async (req, res, next) => {
    const verificationCode = verificationCodeSchema.parse(req.params.code)

    const {user} = await verifyEmail(verificationCode)

    return res.status(OK).json({
        status: 'success',
        message: 'Email verified',
        user,
    })
})

export const sendPasswordResetHandler = catchAsync(async(req, res) => {
    const email = emailSchema.parse(req.body.email)

    const {url, emailId} = await sendPasswordResetEmail(email)

    return res.status(OK).json({
        status: 'success',
        message: 'Password reset email sent',
    })
})