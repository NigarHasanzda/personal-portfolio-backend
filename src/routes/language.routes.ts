import { Router } from "express";
import { z } from "zod";
import {
  createLanguage,
  deleteLanguage,
  getLanguage,
  listLanguages,
  updateLanguage,
} from "../controllers/language.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { objectIdSchema } from "../validations/common.validation";
import {
  createLanguageSchema,
  updateLanguageSchema,
} from "../validations/language.validation";

const router = Router();
const idParamSchema = z.object({ id: objectIdSchema });

router.get("/", listLanguages);
router.get("/:id", validate(idParamSchema, "params"), getLanguage);
router.post("/", authMiddleware, validate(createLanguageSchema), createLanguage);
router.put(
  "/:id",
  authMiddleware,
  validate(idParamSchema, "params"),
  validate(updateLanguageSchema),
  updateLanguage
);
router.delete(
  "/:id",
  authMiddleware,
  validate(idParamSchema, "params"),
  deleteLanguage
);

export default router;
