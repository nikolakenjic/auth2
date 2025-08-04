import catchAsync from "../utils/catchAsync";
import {createAccount, loginUser} from "../services/auth.service";
import {CREATED, OK} from "../constants/http";
import {clearAuthCookies, setAuthCookies} from "../utils/cookies";
import {loginSchema, registerSchema} from "../validations/auth.schemas";
import {verifyToken} from "../utils/jwt";
import SessionModel from "../models/session.model";

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
    const accessToken = req.cookies.accessToken
    const {payload} = verifyToken(accessToken)

    if(payload) {
        await SessionModel.findByIdAndDelete(payload.sessionId)
    }

    return clearAuthCookies(res).status(OK).json({
        status: 'success',
        message: 'Logged out',
    })
})