import catchAsync from "../utils/catchAsync";
import {CREATED, OK} from "../constants/http";
import {createInterviewSessionSchema, updateInterviewSessionSchema} from "../validations/interviewSession.schemas";
import {
    createInterviewSessionService, deleteInterviewSessionService,
    getAllInterviewSessionsService,
    getInterviewSessionByIdService, updateInterviewSessionService
} from "../services/interviewSession.service";
import {ensureFound, toObjectId} from "../utils/dataHelpers";

export const getAllInterviewSessions = catchAsync(async (req, res, next) => {
    const sessions = await getAllInterviewSessionsService(req.user.userId)

    return res.status(OK).json({
        status: 'success',
        sessions
    })
})

export const createInterviewSession = catchAsync(async (req, res, next) => {
    const session = await createInterviewSessionService(req.user.userId, req.body)

    return res.status(CREATED).json({
        status: 'success',
        session
    })
})

export const getInterviewSessionById = catchAsync(async (req, res, next) => {
    const sessionId = toObjectId(req.params.id)

    const session = await getInterviewSessionByIdService(req.user.userId, sessionId)
    ensureFound(session, 'Interview Session Not Found')

    return res.status(OK).json({
        status: 'success',
        session
    })
})

export const updateInterviewSession = catchAsync(async (req, res, next) => {
    const sessionId = toObjectId(req.params.id)

    const updatedInterviewSession = await updateInterviewSessionService(req.user.userId, sessionId, req.body)
    ensureFound(updatedInterviewSession, 'Interview Session Not Found')

    return res.status(OK).json({
        status: 'success',
        session: updatedInterviewSession
    })
})

export const deleteInterviewSession = catchAsync(async (req, res, next) => {
    const sessionId = toObjectId(req.params.id);

    await deleteInterviewSessionService(req.user.userId, sessionId)

    return res.status(OK).json({
        status: 'success',
        message: 'Interview Session Deleted Successfully'
    })
})