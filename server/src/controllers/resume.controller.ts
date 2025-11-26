import catchAsync from "../utils/catchAsync";
import {
    createResumeService, deleteResumeService,
    getAllResumesService,
    getResumeByIdService,
    updateResumeService
} from "../services/resume.service";
import {CREATED, OK} from "../constants/http";
import {createResumeSchema, updateResumeSchema} from "../validations/resume.schemas";
import {ensureFound, toObjectId} from "../utils/dataHelpers";


export const getAllResumes = catchAsync(async (req, res, next) => {
    const resumes = await getAllResumesService(req.userId);

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
    const resumeId = toObjectId(req.params.id)

    const resume = await getResumeByIdService(req.userId, resumeId)
    ensureFound(resume, 'Resume not found')

    return res.status(OK).json({
        status: "success",
        resume
    })
})

export const updateResume = catchAsync(async (req, res, next) => {
    const resumeId = toObjectId(req.params.id)
    const data = updateResumeSchema.parse(req.body)

    const updatedResume = await updateResumeService(req.userId, resumeId, data)
    ensureFound(updatedResume, 'Resume not found')

    return res.status(OK).json({
        status: "success",
        resume: updatedResume
    })
})

export const deleteResume = catchAsync(async (req, res, next) => {
    const resumeId = toObjectId(req.params.id)

    await deleteResumeService(req.userId, resumeId)

    return res.status(OK).json({
        status: "success",
        message: 'Resume deleted'
    })
})