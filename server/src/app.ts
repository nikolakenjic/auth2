import express from 'express';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler';
import catchAsync from './utils/catchAsync';
import authRoute from './routes/auth.route';
import userRoute from './routes/user.route';

const app = express();

app.use(cookieParser());
app.use(express.json());

app.get(
  '/',
  catchAsync(async (req, res, next) => {
    // throw new Error('This is an error');
    return res.send('Node auth');
  })
);

app.use('/auth', authRoute);

// protected routes
app.use('/user', userRoute);

// Error
app.use(errorHandler);

export default app;
