import { Router } from "express";
import { z } from "zod";
import {
  createExperience,
  deleteExperience,
  getExperience,
  listExperience,
  updateExperience,
} from "../controllers/experience.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { objectIdSchema } from "../validations/common.validation";
import {
  createExperienceSchema,
  updateExperienceSchema,
} from "../validations/experience.validation";

const router = Router();
const idParamSchema = z.object({ id: objectIdSchema });

router.get("/", listExperience);
router.get("/:id", validate(idParamSchema, "params"), getExperience);
router.post("/", authMiddleware, validate(createExperienceSchema), createExperience);
router.put(
  "/:id",
  authMiddleware,
  validate(idParamSchema, "params"),
  validate(updateExperienceSchema),
  updateExperience
);
router.delete(
  "/:id",
  authMiddleware,
  validate(idParamSchema, "params"),
  deleteExperience
);

export default router;
