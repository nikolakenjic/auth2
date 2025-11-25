import mongoose from "mongoose";
import appAssert from "./appAssert";
import {BAD_REQUEST, NOT_FOUND} from "../constants/http";

// Convert string into mongoose object
export const toObjectId = (id: string) => {
    appAssert(mongoose.Types.ObjectId.isValid(id), BAD_REQUEST, `Invalid ObjectId: ${id}`);
    return new mongoose.Types.ObjectId(id);
};

// Check if documents exists
export const ensureFound = <T>(doc: T | null, message = "Not found"): T => {
    appAssert(doc, NOT_FOUND, message);
    return doc as T;
};
