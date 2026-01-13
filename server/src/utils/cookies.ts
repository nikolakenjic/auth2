import {CookieOptions, Response} from "express";
import {fifteenMinutesFromNow, thirtyDaysFromNow} from "./date";
import {NODE_ENV} from "../constants/env";

export const API_PATH = '/api/v1';
export const REFRESH_PATH = '/api/v1/auth/refresh';

const isProduction = NODE_ENV === 'production';

const defaults: CookieOptions = {
    sameSite: isProduction ? 'none' : 'lax',
    httpOnly: true,
    secure: isProduction
}

export const getAccessTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: fifteenMinutesFromNow(),
    path: API_PATH
})

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: thirtyDaysFromNow(),
    path: REFRESH_PATH
})

type Params = {
    res: Response;
    accessToken: string;
    refreshToken: string;
}

export const setAuthCookies = ({
                                   res,
                                   accessToken,
                                   refreshToken
                               }: Params) =>
    res
        .cookie('accessToken', accessToken, getAccessTokenCookieOptions())
        .cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions())


export const clearAuthCookies = (res: Response) =>
    res
        .clearCookie('accessToken', {path: API_PATH})
        .clearCookie('refreshToken', {path: REFRESH_PATH})