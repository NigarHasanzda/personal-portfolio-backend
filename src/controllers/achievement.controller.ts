import { Request, Response } from "express";
import { Achievement } from "../models/Achievement";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import {
  CreateAchievementInput,
  UpdateAchievementInput,
} from "../validations/achievement.validation";

export const listAchievements = asyncHandler(async (_req: Request, res: Response) => {
  const data = await Achievement.find().sort({ order: 1 }).lean();
  res.status(200).json({ success: true, data });
});

export const getAchievement = asyncHandler(async (req: Request, res: Response) => {
  const item = await Achievement.findById(req.params.id).lean();
  if (!item) {
    throw new ApiError(404, "Achievement not found");
  }
  res.status(200).json({ success: true, data: item });
});

export const createAchievement = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as CreateAchievementInput;
  const item = await Achievement.create(body);
  res.status(201).json({
    success: true,
    message: "Achievement created successfully",
    data: item,
  });
});

export const updateAchievement = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as UpdateAchievementInput;
  const item = await Achievement.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!item) {
    throw new ApiError(404, "Achievement not found");
  }
  res.status(200).json({
    success: true,
    message: "Achievement updated successfully",
    data: item,
  });
});

export const deleteAchievement = asyncHandler(async (req: Request, res: Response) => {
  const item = await Achievement.findByIdAndDelete(req.params.id).lean();
  if (!item) {
    throw new ApiError(404, "Achievement not found");
  }
  res.status(200).json({
    success: true,
    message: "Achievement deleted successfully",
    data: item,
  });
});
