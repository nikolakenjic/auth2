import mongoose from "mongoose";
import ResumeModel from "../models/resume.model";

export const getAllResumesService = async (userId: mongoose.Types.ObjectId) => {
    return await ResumeModel.find({userId})
}

export const createResumeService = async (userId: mongoose.Types.ObjectId, data: any) => {
    return await ResumeModel.create({
        ...data,
        userId
    })
}

export const getResumeByIdService = async (userId: mongoose.Types.ObjectId, resumeId: mongoose.Types.ObjectId) => {
    return await ResumeModel.findOne({_id: resumeId, userId})
}

export const updateResumeService = async (userId: mongoose.Types.ObjectId, resumeId: mongoose.Types.ObjectId, data: any) => {
    return await ResumeModel.findOneAndUpdate(
        {_id: resumeId, userId},
        {$set: data},
        {new: true}
    )
}

export const deleteResumeService = async (userId: mongoose.Types.ObjectId, resumeId: mongoose.Types.ObjectId) => {
    return await ResumeModel.findOneAndDelete({_id: resumeId, userId})
}