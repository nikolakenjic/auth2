import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import catchAsync from "./utils/catchAsync";
import authRoute from "./routes/auth.route";

const app = express();

app.use(cookieParser());

app.get(
    '/',
    catchAsync(async (req, res, next) => {
        // throw new Error('This is an error');
       return res.send('Node auth');
    })
);

app.use('/auth', authRoute)

// Error
app.use(errorHandler);

export default app;
