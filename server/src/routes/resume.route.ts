import {Router} from 'express';
import {createResume, deleteResume, getAllResumes, getResumeById, updateResume} from "../controllers/resume.controller";

const router = Router();

router.get('/', getAllResumes)
router.post('/', createResume)
router.get('/:id', getResumeById)
router.patch('/:id', updateResume)
router.delete('/:id', deleteResume)

export default router;