import { Request, Response } from "express";
import { Experience } from "../models/Experience";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import {
  CreateExperienceInput,
  UpdateExperienceInput,
} from "../validations/experience.validation";

export const listExperience = asyncHandler(async (_req: Request, res: Response) => {
  const data = await Experience.find()
    .sort({ isCurrent: -1, startDate: -1, order: 1 })
    .lean();
  res.status(200).json({ success: true, data });
});

export const getExperience = asyncHandler(async (req: Request, res: Response) => {
  const item = await Experience.findById(req.params.id).lean();
  if (!item) {
    throw new ApiError(404, "Experience not found");
  }
  res.status(200).json({ success: true, data: item });
});

export const createExperience = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as CreateExperienceInput;
  const item = await Experience.create(body);
  res.status(201).json({
    success: true,
    message: "Experience created successfully",
    data: item,
  });
});

export const updateExperience = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as UpdateExperienceInput;
  const item = await Experience.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!item) {
    throw new ApiError(404, "Experience not found");
  }
  res.status(200).json({
    success: true,
    message: "Experience updated successfully",
    data: item,
  });
});

export const deleteExperience = asyncHandler(async (req: Request, res: Response) => {
  const item = await Experience.findByIdAndDelete(req.params.id).lean();
  if (!item) {
    throw new ApiError(404, "Experience not found");
  }
  res.status(200).json({
    success: true,
    message: "Experience deleted successfully",
    data: item,
  });
});
