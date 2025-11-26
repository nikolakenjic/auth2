import {Router} from 'express';
import {createResume, deleteResume, getAllResumes, getResumeById, updateResume} from "../controllers/resume.controller";
import {validate} from "../middleware/validate";
import {createResumeSchema, updateResumeSchema} from "../validations/resume.schemas";

const router = Router();

router.get('/', getAllResumes)
router.post('/', validate(createResumeSchema), createResume)
router.get('/:id', getResumeById)
router.patch('/:id',validate(updateResumeSchema), updateResume)
router.delete('/:id', deleteResume)

export default router;