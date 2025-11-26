import {AnyZodObject, ZodError} from "zod";
import {Request, Response, NextFunction} from "express";

export const validate =
    (schema: AnyZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                const parsed = schema.parse(req.body);
                req.body = parsed;
                next();
            } catch (err: any) {
                if (err instanceof ZodError) {
                    return res.status(400).json({
                        status: "error",
                        message: err.errors?.[0]?.message,
                        errors: err.errors
                    });
                }

                return res.status(500).json({
                    status: "error",
                    message: 'Validation failed.'
                })
            }
        };
