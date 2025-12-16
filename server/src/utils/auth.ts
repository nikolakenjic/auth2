import SessionModel from "../models/session.model";
import {accessTokenSignOptions, refreshTokenSignOptions, signToken} from "./jwt";

export const createSessionAndTokens = async (userId: string) => {
    // create session
    const session = await SessionModel.create({userId})

    // sign access token and refresh token
    const refreshToken = signToken(
        {sessionId: session._id},
        refreshTokenSignOptions
    );

    const accessToken = signToken(
        {userId, sessionId: session._id},
        accessTokenSignOptions
    );

    return {session, accessToken, refreshToken};
}