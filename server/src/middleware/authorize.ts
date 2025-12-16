import {RequestHandler} from "express";
import appAssert from "../utils/appAssert";
import {FORBIDDEN} from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";

export const authorize = (...roles: string[]): RequestHandler =>
    (req, res, next) => {
        appAssert(
            req.user && roles.includes(req.user.role),
            FORBIDDEN,
            AppErrorCode.Forbidden
        )

        next()
    }