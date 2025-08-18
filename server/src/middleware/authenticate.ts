import {RequestHandler} from 'express';
import appAssert from '../utils/appAssert';
import {UNAUTHORIZED} from '../constants/http';
import AppErrorCode from '../constants/appErrorCode';
import {verifyToken} from '../utils/jwt';
import {ObjectId} from "mongodb";

const authenticate: RequestHandler = (req, res, next) => {
    const accessToken = req.cookies.accessToken as string | undefined;
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

    req.userId = new ObjectId(payload.userId as string);
    req.sessionId = new ObjectId(payload.sessionId as string);

    next();
};

export default authenticate;