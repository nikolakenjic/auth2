import express from 'express';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler';
import catchAsync from './utils/catchAsync';
import authRoute from './routes/auth.route';
import userRoute from './routes/user.route';
import authenticate from './middleware/authenticate';
import sessionRoute from './routes/session.route';

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
app.use('/user', authenticate, userRoute);
app.use('/sessions', authenticate, sessionRoute);

// Error
app.use(errorHandler);

export default app;
