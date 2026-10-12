import { Request, Response } from "express";
import { Education } from "../models/Education";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import {
  CreateEducationInput,
  UpdateEducationInput,
} from "../validations/education.validation";

export const listEducation = asyncHandler(async (_req: Request, res: Response) => {
  const data = await Education.find().sort({ order: 1 }).lean();
  res.status(200).json({ success: true, data });
});

export const getEducation = asyncHandler(async (req: Request, res: Response) => {
  const item = await Education.findById(req.params.id).lean();
  if (!item) {
    throw new ApiError(404, "Education not found");
  }
  res.status(200).json({ success: true, data: item });
});

export const createEducation = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as CreateEducationInput;
  const item = await Education.create(body);
  res.status(201).json({
    success: true,
    message: "Education created successfully",
    data: item,
  });
});

export const updateEducation = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as UpdateEducationInput;
  const item = await Education.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!item) {
    throw new ApiError(404, "Education not found");
  }
  res.status(200).json({
    success: true,
    message: "Education updated successfully",
    data: item,
  });
});

export const deleteEducation = asyncHandler(async (req: Request, res: Response) => {
  const item = await Education.findByIdAndDelete(req.params.id).lean();
  if (!item) {
    throw new ApiError(404, "Education not found");
  }
  res.status(200).json({
    success: true,
    message: "Education deleted successfully",
    data: item,
  });
});
