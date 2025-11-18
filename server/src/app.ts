import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import catchAsync from './utils/catchAsync';
import authRoute from './routes/auth.route';
import authenticate from './middleware/authenticate';
import userRoute from './routes/user.route';
import sessionRoute from './routes/session.route';
import resumeRoute from './routes/resume.route';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

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
app.use('/resume', authenticate, resumeRoute)

// Error
app.use(errorHandler);

console.log('server')

export default app;
