import catchAsync from '../utils/catchAsync';
import {NOT_FOUND, OK} from '../constants/http';
import {
    deleteUserSession,
    getUserSessions,
} from '../services/session.service';

export const getSessionsHandler = catchAsync(async (req, res, next) => {
    const sessions = await getUserSessions(req.userId, req.sessionId);

    return res.status(OK).json(sessions);
});

export const deleteSessionHandler = catchAsync(async (req, res, next) => {
    await deleteUserSession(req.sessionId, req.userId);

    return res.status(OK).json({
        status: 'success',
        message: 'Session deleted',
    });
});
