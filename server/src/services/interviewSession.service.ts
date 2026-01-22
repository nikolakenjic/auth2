import mongoose from "mongoose";
import InterviewSessionModel from "../models/interviewSession.model";
import {CreateInterviewSessionInput, UpdateInterviewSessionInput} from "../validations/interviewSession.schemas";

export const getAllInterviewSessionsService = async (
    userId: mongoose.Types.ObjectId,
) => {
    return await InterviewSessionModel.find({userId}).sort({createdAt: -1})
}

export const createInterviewSessionService = async (
    userId: mongoose.Types.ObjectId,
    data: CreateInterviewSessionInput
) => {
    return await InterviewSessionModel.create({
        ...data,
        userId
    })
}

export const getInterviewSessionByIdService = async (
    userId: mongoose.Types.ObjectId,
    sessionId: mongoose.Types.ObjectId
) => {
    return await InterviewSessionModel.findOne({
        _id: sessionId,
        userId,
    });
};

export const updateInterviewSessionService = async (
    userId: mongoose.Types.ObjectId,
    sessionId: mongoose.Types.ObjectId,
    data: UpdateInterviewSessionInput
) => {
    return await InterviewSessionModel.findOneAndUpdate(
        {_id: sessionId, userId},
        {$set: data},
        {new: true}
    );
};

export const deleteInterviewSessionService = async (
    userId: mongoose.Types.ObjectId,
    sessionId: mongoose.Types.ObjectId
) => {
    return await InterviewSessionModel.findOneAndDelete({
        _id: sessionId,
        userId,
    });
};