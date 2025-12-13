import {RequestHandler} from 'express';
import appAssert from '../utils/appAssert';
import {UNAUTHORIZED} from '../constants/http';
import AppErrorCode from '../constants/appErrorCode';
import {verifyToken} from '../utils/jwt';
import {ObjectId} from "mongodb";

const authenticate: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;
    const tokenFromCookie = req.cookies.accessToken as string;

    const accessToken = tokenFromHeader || tokenFromCookie;
    appAssert(
        accessToken,
        UNAUTHORIZED,
        'Not authorized',
        AppErrorCode.InvalidAccessToken
    );

    const {error, payload} = verifyToken(accessToken);
    appAssert(
        payload,
        UNAUTHORIZED,
        error === 'jwt expired' ? 'Token expired' : 'Invalid access token',
        AppErrorCode.InvalidAccessToken
    );

    // attach user object
    req.user = {
        userId: new ObjectId(payload.userId as string),
        role: payload.role || 'user',
        sessionId: new ObjectId(payload.sessionId as string)
    };

    next();
};

export default authenticate;