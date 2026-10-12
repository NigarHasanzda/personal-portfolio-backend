import { Router } from "express";
import achievementRoutes from "./achievement.routes";
import authRoutes from "./auth.routes";
import educationRoutes from "./education.routes";
import experienceRoutes from "./experience.routes";
import languageRoutes from "./language.routes";
import portfolioRoutes from "./portfolio.routes";
import profileRoutes from "./profile.routes";
import projectRoutes from "./project.routes";
import skillsRoutes from "./skills.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/skills", skillsRoutes);
router.use("/experience", experienceRoutes);
router.use("/education", educationRoutes);
router.use("/achievements", achievementRoutes);
router.use("/languages", languageRoutes);
router.use("/projects", projectRoutes);
router.use("/portfolio", portfolioRoutes);

export default router;
