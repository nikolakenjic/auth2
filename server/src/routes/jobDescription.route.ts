import { Router } from "express";
import {
    createJobDescription,
    deleteJobDescription,
    getAllJobDescriptions,
    getJobDescriptionById,
    updateJobDescription,
} from "../controllers/jobDescription.controller";
import { validate } from "../middleware/validate";
import {
    createJobDescriptionSchema,
    updateJobDescriptionSchema,
} from "../validations/jobDescription.schemas";

const router = Router();

router.get("/", getAllJobDescriptions);
router.post("/", validate(createJobDescriptionSchema), createJobDescription);
router.get("/:id", getJobDescriptionById);
router.patch("/:id", validate(updateJobDescriptionSchema), updateJobDescription);
router.delete("/:id", deleteJobDescription);

export default router;
