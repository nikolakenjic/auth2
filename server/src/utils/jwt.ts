import {SessionDocument} from "../models/session.model";
import {UserDocument} from "../models/user.model";
import jwt, {SignOptions, VerifyOptions} from "jsonwebtoken";
import {JWT_REFRESH_SECRET, JWT_SECRET} from "../constants/env";

const defaults: SignOptions = {
    audience: ['user'],
};

export type RefreshTokenPayload = {
    sessionId: SessionDocument['_id'];
};

export type AccessTokenPayload = RefreshTokenPayload & {
    userId: UserDocument['_id'];
    role: UserDocument['role'];
};

type SignOptionsAndSecret = SignOptions & {
    secret: string
}

export const refreshTokenSignOptions: SignOptionsAndSecret = {
    expiresIn: '30d',
    secret: JWT_REFRESH_SECRET
}

export const accessTokenSignOptions: SignOptionsAndSecret = {
    expiresIn: '15m',
    secret: JWT_SECRET
}


export const signToken = (
    payload: AccessTokenPayload | RefreshTokenPayload,
    options ?: SignOptionsAndSecret
) => {
    const {secret, ...signOpts} = options || accessTokenSignOptions;

    return jwt.sign(payload, secret, {
        ...defaults,
        ...signOpts
    })
}

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
    token: string,
    options?: VerifyOptions & { secret?: string }
) => {
    const { secret = JWT_SECRET, ...verifyOpts } = options || {};

    // Fix audience type
    const fixedAudience =
        Array.isArray(verifyOpts.audience)
            ? verifyOpts.audience as [string | RegExp, ...(string | RegExp)[]]
            : verifyOpts.audience;

    try {
        const payload = jwt.verify(token, secret, {
            ...defaults,
            ...verifyOpts,
            audience: fixedAudience,
        }) as unknown as TPayload;

        return {
            payload,
        };
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
};

