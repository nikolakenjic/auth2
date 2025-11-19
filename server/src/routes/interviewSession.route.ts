import {Router} from 'express';
import {
    createInterviewSession, deleteInterviewSession,
    getAllInterviewSessions,
    getInterviewSessionById,
    updateInterviewSession
} from "../controllers/interviewSession.controller";

const router = Router();

router.get('/', getAllInterviewSessions)
router.post('/', createInterviewSession)
router.get('/:id', getInterviewSessionById)
router.patch('/:id', updateInterviewSession)
router.delete('/:id', deleteInterviewSession)

export default router;