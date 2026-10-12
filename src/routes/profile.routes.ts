import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { updateProfileSchema } from "../validations/profile.validation";

const router = Router();

router.get("/", getProfile);
router.put("/", authMiddleware, validate(updateProfileSchema), updateProfile);

export default router;
