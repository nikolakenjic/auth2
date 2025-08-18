import mongoose from 'mongoose';
import SessionModel from '../models/session.model';
import appAssert from '../utils/appAssert';
import {NOT_FOUND} from '../constants/http';
import {sessionSchema} from '../validations/auth.schemas';

type SessionParams = {
    userId: mongoose.Types.ObjectId;
    sessionId?: mongoose.Types.ObjectId;
};

export const getUserSessions = async (
    userId: SessionParams['userId'],
    sessionId?: SessionParams['sessionId']
) => {
    const sessions = await SessionModel.find(
        {
            userId,
            expiresAt: {$gt: new Date()},
        },
        {
            _id: 1,
            createdAt: 1,
        },
        {
            sort: {createdAt: -1},
        }
    );

    // mark the current session
    return sessions.map((session) => ({
        ...session.toObject(),
        ...(session._id === sessionId && {current: true}),
    }));
};

export const deleteUserSession = async (
    sessionId: SessionParams['sessionId'],
    userId: SessionParams['userId']
) => {
    // valid sessionId
    const validSessionId = sessionSchema.parse(sessionId);

    // delete session
    const deleted = await SessionModel.findOneAndDelete({
        _id: validSessionId,
        userId,
    });
    appAssert(deleted, NOT_FOUND, 'Session not found');

    return deleted;
};
