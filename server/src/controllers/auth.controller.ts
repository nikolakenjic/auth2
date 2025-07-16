import catchAsync from "../utils/catchAsync";
import {z} from "zod";


const registerSchema = z.object({
    email: z.string().email().min(1).max(50),
    password: z.string().min(6).max(50),
    confirmPassword: z.string().min(6).max(50),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})

export const registerHandler = catchAsync(async (req, res, next) => {
//    validate request
    const request = registerSchema.parse(req.body);
//     call service
//     return response
})