import mongoose from "mongoose";
import ResumeModel from "../models/resume.model";

export const getAllResumesService = async (userId: mongoose.Types.ObjectId) => {
    return await ResumeModel.find({userId})
}