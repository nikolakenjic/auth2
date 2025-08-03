import catchAsync from "../utils/catchAsync";
import {createAccount, loginUser} from "../services/auth.service";
import {CREATED, OK} from "../constants/http";
import {setAuthCookies} from "../utils/cookies";
import {loginSchema, registerSchema} from "../validations/auth.schemas";

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