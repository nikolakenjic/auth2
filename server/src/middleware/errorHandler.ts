import {ErrorRequestHandler, Response} from "express";
import {BAD_REQUEST, INTERNAL_SERVER_ERROR} from "../constants/http";
import {z} from "zod";
import AppError from "../utils/AppError";
import {clearAuthCookies, REFRESH_PATH} from "../utils/cookies";
import {NODE_ENV} from "../constants/env";

// Handle Zod Error
const handleZodError = (res: Response, error: z.ZodError) => {
    const errors = error.issues.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
    }));

    return res.status(BAD_REQUEST).json({
        message: error.message,
        errors,
    });
}

const handleAppError = (res: Response, error: AppError) => {
    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
    })
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log(`PATH: ${req.path}`, error)
    console.error(error);

    // Clear all cookies if we got some error
    if (req.path === REFRESH_PATH) {
        clearAuthCookies(res)
    }

    if (error instanceof z.ZodError) {
        return handleZodError(res, error);
    }

    if (error instanceof AppError) {
        return handleAppError(res, error);
    }

    return res.status(INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error',
        error: NODE_ENV === 'development' ? error.message : undefined,
        stack: NODE_ENV === 'development' ? error.stack : undefined
    })
}

export default errorHandler