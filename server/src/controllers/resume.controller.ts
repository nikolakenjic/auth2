import catchAsync from "../utils/catchAsync";
import {
    createResumeService, deleteResumeService,
    getAllResumesService,
    getResumeByIdService,
    updateResumeService
} from "../services/resume.service";
import {CREATED, OK} from "../constants/http";
import {ensureFound, toObjectId} from "../utils/dataHelpers";


export const getAllResumes = catchAsync(async (req, res, next) => {
    const resumes = await getAllResumesService(req.user.userId);

    return res.status(OK).json({
        status: "success",
        resumes
    })
})

export const createResume = catchAsync(async (req, res, next) => {
    const resume = await createResumeService(req.user.userId, req.body)

    return res.status(CREATED).json({
        status: "success",
        resume
    })
})

export const getResumeById = catchAsync(async (req, res, next) => {
    const resumeId = toObjectId(req.params.id)

    const resume = await getResumeByIdService(req.user.userId, resumeId)
    ensureFound(resume, 'Resume not found')

    return res.status(OK).json({
        status: "success",
        resume
    })
})

export const updateResume = catchAsync(async (req, res, next) => {
    const resumeId = toObjectId(req.params.id)

    const updatedResume = await updateResumeService(req.user.userId, resumeId, req.body)
    ensureFound(updatedResume, 'Resume not found')

    return res.status(OK).json({
        status: "success",
        resume: updatedResume
    })
})

export const deleteResume = catchAsync(async (req, res, next) => {
    const resumeId = toObjectId(req.params.id)

    await deleteResumeService(req.user.userId, resumeId)

    return res.status(OK).json({
        status: "success",
        message: 'Resume deleted'
    })
})