import catchAsync from "../utils/catchAsync";
import {CREATED, OK} from "../constants/http";
import {validate} from "../middleware/validate";
import {ensureFound, toObjectId} from "../utils/dataHelpers";
import {
    createJobDescriptionService,
    deleteJobDescriptionService,
    getAllJobDescriptionsService,
    getJobDescriptionByIdService,
    updateJobDescriptionService,
} from "../services/jobDescription.service";

export const getAllJobDescriptions = catchAsync(async (req, res) => {
    const jobDescriptions = await getAllJobDescriptionsService(req.user.userId);

    return res.status(OK).json({
        status: "success",
        jobDescriptions,
    });
});

export const createJobDescription = catchAsync(async (req, res) => {
    const jd = await createJobDescriptionService(req.user.userId, req.body);

    return res.status(CREATED).json({
        status: "success",
        jobDescription: jd,
    });
});

export const getJobDescriptionById = catchAsync(async (req, res) => {
    const jdId = toObjectId(req.params.id);

    const jd = await getJobDescriptionByIdService(req.user.userId, jdId);
    ensureFound(jd, "Job Description not found");

    return res.status(OK).json({
        status: "success",
        jobDescription: jd,
    });
});

export const updateJobDescription = catchAsync(async (req, res) => {
    const jdId = toObjectId(req.params.id);

    const updated = await updateJobDescriptionService(req.user.userId, jdId, req.body);
    ensureFound(updated, "Job Description not found");

    return res.status(OK).json({
        status: "success",
        jobDescription: updated,
    });
});

export const deleteJobDescription = catchAsync(async (req, res) => {
    const jdId = toObjectId(req.params.id);

    await deleteJobDescriptionService(req.user.userId, jdId);

    return res.status(OK).json({
        status: "success",
        message: "Job Description deleted successfully",
    });
});
