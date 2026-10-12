import { Router } from "express";
import { z } from "zod";
import {
  createAchievement,
  deleteAchievement,
  getAchievement,
  listAchievements,
  updateAchievement,
} from "../controllers/achievement.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { objectIdSchema } from "../validations/common.validation";
import {
  createAchievementSchema,
  updateAchievementSchema,
} from "../validations/achievement.validation";

const router = Router();
const idParamSchema = z.object({ id: objectIdSchema });

router.get("/", listAchievements);
router.get("/:id", validate(idParamSchema, "params"), getAchievement);
router.post("/", authMiddleware, validate(createAchievementSchema), createAchievement);
router.put(
  "/:id",
  authMiddleware,
  validate(idParamSchema, "params"),
  validate(updateAchievementSchema),
  updateAchievement
);
router.delete(
  "/:id",
  authMiddleware,
  validate(idParamSchema, "params"),
  deleteAchievement
);

export default router;
