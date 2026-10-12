import { Router } from "express";
import { z } from "zod";
import {
  createProject,
  deleteProject,
  getProject,
  getProjectBySlug,
  listProjects,
  updateProject,
} from "../controllers/project.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { objectIdSchema, slugSchema } from "../validations/common.validation";
import {
  createProjectSchema,
  projectQuerySchema,
  updateProjectSchema,
} from "../validations/project.validation";

const router = Router();
const idParamSchema = z.object({ id: objectIdSchema });
const slugParamSchema = z.object({ slug: slugSchema });

router.get("/", validate(projectQuerySchema, "query"), listProjects);
router.get("/slug/:slug", validate(slugParamSchema, "params"), getProjectBySlug);
router.get("/:id", validate(idParamSchema, "params"), getProject);
router.post("/", authMiddleware, validate(createProjectSchema), createProject);
router.put(
  "/:id",
  authMiddleware,
  validate(idParamSchema, "params"),
  validate(updateProjectSchema),
  updateProject
);
router.delete(
  "/:id",
  authMiddleware,
  validate(idParamSchema, "params"),
  deleteProject
);

export default router;
