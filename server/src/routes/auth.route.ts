import { Router } from 'express';
import {
  emailVerifyHandler,
  googleAuthHandler,
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  resendEmailVerificationHandler,
  resetPasswordHandler,
  sendPasswordResetHandler,
} from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);

router.get('/refresh', refreshHandler);
router.get('/logout', logoutHandler);

router.get('/email/verify/:code', emailVerifyHandler);
router.post('/email/resend-verification', resendEmailVerificationHandler);

router.post('/password/forgot', sendPasswordResetHandler);
router.post('/password/reset', resetPasswordHandler);

// Google Auth
router.post('/google', googleAuthHandler);

export default router;
