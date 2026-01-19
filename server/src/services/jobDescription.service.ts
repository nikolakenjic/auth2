import mongoose from "mongoose";
import JobDescriptionModel from "../models/jobDescription.model";
import { CreateJobDescriptionInput, UpdateJobDescriptionInput } from "../validations/jobDescription.schemas";

export const getAllJobDescriptionsService = async (userId: mongoose.Types.ObjectId) => {
    return JobDescriptionModel.find({ userId }).sort({ createdAt: -1 });
};

export const createJobDescriptionService = async (
    userId: mongoose.Types.ObjectId,
    data: CreateJobDescriptionInput
) => {
    return JobDescriptionModel.create({ ...data, userId });
};

export const getJobDescriptionByIdService = async (
    userId: mongoose.Types.ObjectId,
    jdId: mongoose.Types.ObjectId
) => {
    return JobDescriptionModel.findOne({ _id: jdId, userId });
};

export const updateJobDescriptionService = async (
    userId: mongoose.Types.ObjectId,
    jdId: mongoose.Types.ObjectId,
    data: UpdateJobDescriptionInput
) => {
    return JobDescriptionModel.findOneAndUpdate(
        { _id: jdId, userId },
        { $set: data },
        { new: true }
    );
};

export const deleteJobDescriptionService = async (
    userId: mongoose.Types.ObjectId,
    jdId: mongoose.Types.ObjectId
) => {
    return JobDescriptionModel.findOneAndDelete({ _id: jdId, userId });
};
