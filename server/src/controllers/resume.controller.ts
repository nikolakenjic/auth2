import catchAsync from "../utils/catchAsync";
import {
    createResumeService, deleteResumeService,
    getAllResumesService,
    getResumeByIdService,
    updateResumeService
} from "../services/resume.service";
import {CREATED, OK} from "../constants/http";
import {createResumeSchema} from "../validations/resume.schemas";
import mongoose from "mongoose";


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
    const userId = req.userId
    const resumeId = new mongoose.Types.ObjectId(req.params.id)

    const resume = await getResumeByIdService(userId, resumeId)

    return res.status(OK).json({
        status: "success",
        resume
    })
})

export const updateResume = catchAsync(async (req, res, next) => {
    const userId = req.userId
    const resumeId = new mongoose.Types.ObjectId(req.params.id)
    const data = req.body

    const updateResume = await updateResumeService(userId, resumeId, data)

    return res.status(OK).json({
        status: "success",
        resume: updateResume
    })
})

export const deleteResume = catchAsync(async (req, res, next) => {
    const userId = req.userId
    const resumeId = new mongoose.Types.ObjectId(req.params.id)

    await deleteResumeService(userId, resumeId)

    return res.status(OK).json({
        status: "success",
        message: 'Resume deleted'
    })
})