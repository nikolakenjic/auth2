import catchAsync from "../utils/catchAsync";

export const getAllInterviewSessions = catchAsync(async (req, res, next) => {
    res.send('all ISs')
})

export const createInterviewSession = catchAsync(async (req, res, next) => {
    res.send('create IS')
})

export const getInterviewSessionById = catchAsync(async (req, res, next) => {
    res.send('get IS')
})

export const updateInterviewSession = catchAsync(async (req, res, next) => {
    res.send('update IS')
})

export const deleteInterviewSession = catchAsync(async (req, res, next) => {
    res.send('delete IS')
})