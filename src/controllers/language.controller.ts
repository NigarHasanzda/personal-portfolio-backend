import { Request, Response } from "express";
import { Language } from "../models/Language";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import {
  CreateLanguageInput,
  UpdateLanguageInput,
} from "../validations/language.validation";

export const listLanguages = asyncHandler(async (_req: Request, res: Response) => {
  const data = await Language.find().sort({ order: 1 }).lean();
  res.status(200).json({ success: true, data });
});

export const getLanguage = asyncHandler(async (req: Request, res: Response) => {
  const item = await Language.findById(req.params.id).lean();
  if (!item) {
    throw new ApiError(404, "Language not found");
  }
  res.status(200).json({ success: true, data: item });
});

export const createLanguage = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as CreateLanguageInput;
  const item = await Language.create(body);
  res.status(201).json({
    success: true,
    message: "Language created successfully",
    data: item,
  });
});

export const updateLanguage = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as UpdateLanguageInput;
  const item = await Language.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!item) {
    throw new ApiError(404, "Language not found");
  }
  res.status(200).json({
    success: true,
    message: "Language updated successfully",
    data: item,
  });
});

export const deleteLanguage = asyncHandler(async (req: Request, res: Response) => {
  const item = await Language.findByIdAndDelete(req.params.id).lean();
  if (!item) {
    throw new ApiError(404, "Language not found");
  }
  res.status(200).json({
    success: true,
    message: "Language deleted successfully",
    data: item,
  });
});
