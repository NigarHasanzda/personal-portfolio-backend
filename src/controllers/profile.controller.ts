import { Request, Response } from "express";
import { Profile } from "../models/Profile";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { UpdateProfileInput } from "../validations/profile.validation";

export const getProfile = asyncHandler(async (_req: Request, res: Response) => {
  const profile = await Profile.findOne().lean();
  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }
  res.status(200).json({ success: true, data: profile });
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as UpdateProfileInput;
  const profile = await Profile.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  }).lean();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: profile,
  });
});
