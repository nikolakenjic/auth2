import {Router} from 'express';
import {
    createCoverLetter, deleteCoverLetter,
    getAllCoverLetters,
    getCoverLetterById,
    updateCoverLetter
} from "../controllers/coverLetter.controller";

const router = Router();

router.get('/', getAllCoverLetters)
router.post('/', createCoverLetter)
router.get('/:id', getCoverLetterById)
router.patch('/:id', updateCoverLetter)
router.delete('/:id', deleteCoverLetter)

export default router;