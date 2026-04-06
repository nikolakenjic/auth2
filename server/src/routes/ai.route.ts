import {Router} from 'express';
import {improveBullet} from '../controllers/ai.controller';

const router = Router();

router.post('/improve-bullet', improveBullet);

export default router;
