import { Router } from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import sessionRoute from './session.route';
import resumeRoute from './resume.route';
import coverLetterRoute from './coverLetter.route';
import interviewSessionRoute from './interviewSession.route';
import authenticate from '../middleware/authenticate';

const router = Router();

// public routes
router.use('/auth', authRoute);

// protected routes
router.use('/user', authenticate, userRoute);
router.use('/sessions', authenticate, sessionRoute);
router.use('/resume', authenticate, resumeRoute);
router.use('/cover-letter', authenticate, coverLetterRoute);
router.use('/interview-session', authenticate, interviewSessionRoute);

export default router;
