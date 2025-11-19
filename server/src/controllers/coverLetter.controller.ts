import catchAsync from "../utils/catchAsync";

export const getAllCoverLetters = catchAsync(async (req, res, next) => {
    res.send('all CLs')
})

export const createCoverLetter = catchAsync(async (req, res, next) => {
    res.send('create CL')
})

export const getCoverLetterById = catchAsync(async (req, res, next) => {
    res.send('get CL')
})

export const updateCoverLetter = catchAsync(async (req, res, next) => {
    res.send('update CL')
})

export const deleteCoverLetter = catchAsync(async (req, res, next) => {
    res.send('delete CL')
})