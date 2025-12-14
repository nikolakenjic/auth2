import {AnyZodObject, ZodError} from "zod";
import {NextFunction, Request, Response} from "express";
import AppError from "../utils/AppError";
import {BAD_REQUEST} from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";

export const validate =
    (schema: AnyZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                const parsed = schema.parse(req.body);
                req.body = parsed;
                next();
            } catch (err: any) {
                if (err instanceof ZodError) {
                    const formatted = err.issues.map((issue) => ({
                        path: issue.path.join('.'),
                        message: issue.message,
                    }));
                    return next(
                        new AppError(
                            BAD_REQUEST,
                            'Validation failed',
                            AppErrorCode.ValidationError,
                            {errors: formatted}
                        )
                    );
                }

                return next(
                    new AppError(
                        BAD_REQUEST,
                        "Validation failed",
                        AppErrorCode.ValidationError,
                    )
                );
            }
        };
