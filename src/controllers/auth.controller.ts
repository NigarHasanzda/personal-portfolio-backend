import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { env } from "../config/env";
import { Admin } from "../models/Admin";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { LoginInput, RegisterInput } from "../validations/auth.validation";

const signToken = (admin: { _id: { toString(): string }; email: string; role: string }) =>
  jwt.sign(
    { email: admin.email, role: admin.role },
    env.JWT_SECRET,
    { subject: admin._id.toString(), expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] }
  );

export const register = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as RegisterInput;
  const existing = await Admin.findOne({ email: body.email });
  if (existing) {
    throw new ApiError(409, "Email already registered");
  }

  const hashedPassword = await bcrypt.hash(body.password, 12);
  const admin = await Admin.create({
    username: body.username,
    email: body.email,
    password: hashedPassword,
    role: body.role ?? "admin",
  });

  const token = signToken(admin);

  res.status(201).json({
    success: true,
    message: "Admin registered successfully",
    data: {
      token,
      user: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as LoginInput;
  const admin = await Admin.findOne({ email: body.email }).select("+password");
  if (!admin) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(body.password, admin.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = signToken(admin);

  res.status(200).json({
    success: true,
    data: {
      token,
      user: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    },
  });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const admin = await Admin.findById(req.user.id).lean();
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  res.status(200).json({
    success: true,
    data: {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    },
  });
});
