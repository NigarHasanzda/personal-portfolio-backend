import { Router } from "express";
import { getSkills, updateSkills } from "../controllers/skills.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { updateSkillsSchema } from "../validations/skills.validation";

const router = Router();

router.get("/", getSkills);
router.put("/", authMiddleware, validate(updateSkillsSchema), updateSkills);

export default router;
