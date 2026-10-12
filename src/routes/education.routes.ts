import { Router } from "express";
import { z } from "zod";
import {
  createEducation,
  deleteEducation,
  getEducation,
  listEducation,
  updateEducation,
} from "../controllers/education.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { objectIdSchema } from "../validations/common.validation";
import {
  createEducationSchema,
  updateEducationSchema,
} from "../validations/education.validation";

const router = Router();
const idParamSchema = z.object({ id: objectIdSchema });

router.get("/", listEducation);
router.get("/:id", validate(idParamSchema, "params"), getEducation);
router.post("/", authMiddleware, validate(createEducationSchema), createEducation);
router.put(
  "/:id",
  authMiddleware,
  validate(idParamSchema, "params"),
  validate(updateEducationSchema),
  updateEducation
);
router.delete(
  "/:id",
  authMiddleware,
  validate(idParamSchema, "params"),
  deleteEducation
);

export default router;
