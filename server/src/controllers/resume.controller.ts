import catchAsync from "../utils/catchAsync";
import {createResumeService, getAllResumesService} from "../services/resume.service";
import {CREATED, OK} from "../constants/http";
import {createResumeSchema} from "../validations/resume.schemas";


export const getAllResumes = catchAsync(async (req, res, next) => {
    const userId = req.userId

    const resumes = await getAllResumesService(userId);

    return res.status(OK).json({
        status: "success",
        resumes
    })
})

export const createResume = catchAsync(async (req, res, next) => {
    const data = createResumeSchema.parse(req.body)

    const resume = await createResumeService(req.userId, data)

    return res.status(CREATED).json({
        status: "success",
        resume
    })
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