import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
    throw new Error('test')
    return res.status(200).json({ status: "success" });
});

app.use(errorHandler);

export default app;
