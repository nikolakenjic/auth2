import mongoose from "mongoose";
import ResumeModel from "../models/resume.model";
import {CreateResumeInput, UpdateResumeInput} from "../validations/resume.schemas";

export const getAllResumesService = async (
    userId: mongoose.Types.ObjectId
) => {
    return await ResumeModel.find({userId}).sort({createdAt: -1})
}

export const createResumeService = async (
    userId: mongoose.Types.ObjectId,
    data: CreateResumeInput
) => {
    return await ResumeModel.create({
        ...data,
        userId
    })
}

export const getResumeByIdService = async (
    userId: mongoose.Types.ObjectId,
    resumeId: mongoose.Types.ObjectId
) => {
    return await ResumeModel.findOne({_id: resumeId, userId})
}

export const updateResumeService = async (
    userId: mongoose.Types.ObjectId,
    resumeId: mongoose.Types.ObjectId,
    data: UpdateResumeInput
) => {
    return await ResumeModel.findOneAndUpdate(
        {_id: resumeId, userId},
        {$set: data},
        {new: true}
    )
}

export const deleteResumeService = async (
    userId: mongoose.Types.ObjectId,
    resumeId: mongoose.Types.ObjectId
) => {
    return await ResumeModel.findOneAndDelete({_id: resumeId, userId})
}