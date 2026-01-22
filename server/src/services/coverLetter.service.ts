import mongoose from "mongoose";
import CoverLetterModel from "../models/coverLetter.model";
import {CreateCoverLetterInput, UpdateCoverLetterInput} from "../validations/coverLetter.schemas";

export const getAllCoverLettersService = async (
    userId: mongoose.Types.ObjectId
) => {
    return await CoverLetterModel.find({userId}).sort({createdAt: -1})
}

export const createCoverLetterService = async (
    userId: mongoose.Types.ObjectId,
    data: CreateCoverLetterInput
) => {
    return await CoverLetterModel.create({
        ...data,
        userId
    })
}

export const getCoverLetterByIdService = async (
    userId: mongoose.Types.ObjectId,
    coverLetterId: mongoose.Types.ObjectId
) => {
    return await CoverLetterModel.findOne({_id: coverLetterId, userId})
}

export const updateCoverLetterService = async (
    userId: mongoose.Types.ObjectId,
    coverLetterId: mongoose.Types.ObjectId,
    data: UpdateCoverLetterInput
) => {
    return await CoverLetterModel.findOneAndUpdate(
        {_id: coverLetterId, userId},
        {$set: data},
        {new: true}
    )
}

export const deleteCoverLetterService = async (
    userId: mongoose.Types.ObjectId,
    coverLetterId: mongoose.Types.ObjectId
) => {
    return await CoverLetterModel.findOneAndDelete(
        {_id: coverLetterId, userId},
    )
}