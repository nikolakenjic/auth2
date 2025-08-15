import { Router } from 'express';
import { getUserHandler } from '../controllers/user.controller';

const router = Router();

router.get('/me', getUserHandler);

export default router;
