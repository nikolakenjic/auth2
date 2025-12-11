import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import {CLIENT_URL} from "../constants/env";

export const coreMiddleware = (app:express.Application) => {
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        origin: CLIENT_URL,
        credentials: true,
    }))
}