import catchAsync from "../utils/catchAsync";
import {z} from "zod";
import {createAccount} from "../services/auth.service";
import {CREATED} from "../constants/http";
import {setAuthCookies} from "../utils/cookies";


const registerSchema = z.object({
    email: z.string().email().min(1).max(50),
    password: z.string().min(6).max(50),
    confirmPassword: z.string().min(6).max(50),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})

export const registerHandler = catchAsync(async (req, res, next) => {
// //    validate request
    const request = registerSchema.parse(req.body);
    // console.log(request)

//     call service
    const {user, accessToken, refreshToken} = await createAccount(request)

//     return response
    return setAuthCookies({res, accessToken, refreshToken}).status(CREATED).json(user)
})

export const loginHandler = catchAsync(async (req, res, next) => {
    return res.send('login')
})