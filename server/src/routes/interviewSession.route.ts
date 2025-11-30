import {Router} from 'express';
import {
    createInterviewSession, deleteInterviewSession,
    getAllInterviewSessions,
    getInterviewSessionById,
    updateInterviewSession
} from "../controllers/interviewSession.controller";
import {validate} from "../middleware/validate";
import {createInterviewSessionSchema, updateInterviewSessionSchema} from "../validations/interviewSession.schemas";

const router = Router();

router.get('/', getAllInterviewSessions)
router.post('/', validate(createInterviewSessionSchema), createInterviewSession)
router.get('/:id', getInterviewSessionById)
router.patch('/:id', validate(updateInterviewSessionSchema), updateInterviewSession)
router.delete('/:id', deleteInterviewSession)

export default router;