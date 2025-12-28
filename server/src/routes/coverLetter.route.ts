import {Router} from 'express';
import {
    createCoverLetter, deleteCoverLetter,
    getAllCoverLetters,
    getCoverLetterById,
    updateCoverLetter
} from "../controllers/coverLetter.controller";
import {validate} from "../middleware/validate";
import {createCoverLetterSchema, updateCoverLetterSchema} from "../validations/coverLetter.schemas";

const router = Router();

router.get('/', getAllCoverLetters)
router.post('/', validate(createCoverLetterSchema), createCoverLetter)
router.get('/:id', getCoverLetterById)
router.patch('/:id', validate(updateCoverLetterSchema), updateCoverLetter)
router.delete('/:id', deleteCoverLetter)

export default router;