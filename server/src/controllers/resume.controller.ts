import catchAsync from "../utils/catchAsync";

export const getAllResumes = catchAsync(async (req, res, next) => {
    res.send('all resumes')
})

export const createResume = catchAsync(async (req, res, next) => {
    res.send('create resume')
})

export const getResumeById = catchAsync(async (req, res, next) => {
    res.send('get resume')
})

export const updateResume = catchAsync(async (req, res, next) => {
    res.send('update resume')
})

export const deleteResume = catchAsync(async (req, res, next) => {
    res.send('delete resume')
})