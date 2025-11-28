import mongoose from "mongoose";
import CoverLetterModel from "../models/coverLetter.model";

export const getAllCoverLettersService = async (userId: mongoose.Types.ObjectId) => {
    return await CoverLetterModel.find({userId})
}

export const createCoverLetterService = async (userId: mongoose.Types.ObjectId, data: any) => {
    return await CoverLetterModel.create({
        ...data,
        userId
    })
}