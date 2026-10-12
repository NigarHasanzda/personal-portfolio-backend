import { Request, Response } from "express";
import { Skills } from "../models/Skills";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { UpdateSkillsInput } from "../validations/skills.validation";

export const getSkills = asyncHandler(async (_req: Request, res: Response) => {
  const skills = await Skills.findOne().lean();
  if (!skills) {
    throw new ApiError(404, "Skills not found");
  }
  res.status(200).json({ success: true, data: skills });
});

export const updateSkills = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as UpdateSkillsInput;
  const skills = await Skills.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  }).lean();

  res.status(200).json({
    success: true,
    message: "Skills updated successfully",
    data: skills,
  });
});
