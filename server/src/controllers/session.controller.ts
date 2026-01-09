import catchAsync from '../utils/catchAsync';
import {OK} from '../constants/http';
import {
    deleteUserSession,
    getUserSessions,
} from '../services/session.service';

export const getSessionsHandler = catchAsync(async (req, res, next) => {
    const sessions = await getUserSessions(req.user.userId!, req.user.sessionId!);

    return res.status(OK).json(sessions);
});

export const deleteSessionHandler = catchAsync(async (req, res, next) => {
    await deleteUserSession(req.user.sessionId, req.user.userId!);

    return res.status(OK).json({
        status: 'success',
        message: 'Session deleted',
    });
});
