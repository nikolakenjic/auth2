import catchAsync from "../utils/catchAsync";
import {
    createCoverLetterService, deleteCoverLetterService,
    getAllCoverLettersService,
    getCoverLetterByIdService, updateCoverLetterService
} from "../services/coverLetter.service";
import {CREATED, OK} from "../constants/http";
import {createCoverLetterSchema, updateCoverLetterSchema} from "../validations/coverLetter.schemas";
import {ensureFound, toObjectId} from "../utils/dataHelpers";

export const getAllCoverLetters = catchAsync(async (req, res, next) => {
    const coverLetters = await getAllCoverLettersService(req.user.userId)

    return res.status(OK).json({
        status: "success",
        coverLetters: coverLetters
    })
})

export const createCoverLetter = catchAsync(async (req, res, next) => {
    const data = createCoverLetterSchema.parse(req.body)

    const coverLetter = await createCoverLetterService(req.user.userId, data)

    return res.status(CREATED).json({
        status: "success",
        coverLetter
    })
})

export const getCoverLetterById = catchAsync(async (req, res, next) => {
    const coverLetterId = toObjectId(req.params.id)

    const coverLetter = await getCoverLetterByIdService(req.user.userId, coverLetterId)
    ensureFound(coverLetter, 'Cover Letter not found')

    return res.status(OK).json({
        status: "success",
        coverLetter
    })
})

export const updateCoverLetter = catchAsync(async (req, res, next) => {
    const coverLetterId = toObjectId(req.params.id)
    const data = updateCoverLetterSchema.parse(req.body)

    const updatedCoverLetter = await updateCoverLetterService(req.user.userId, coverLetterId, data)
    ensureFound(updatedCoverLetter, 'Cover Letter not found')

    return res.status(OK).json({
        status: "success",
        coverLetter: updatedCoverLetter
    })
})

export const deleteCoverLetter = catchAsync(async (req, res, next) => {
    const coverLetterId = toObjectId(req.params.id)

    await deleteCoverLetterService(req.user.userId, coverLetterId)

    return res.status(OK).json({
        status: "success",
        message: "Cover Letter deleted successfully"
    })
})