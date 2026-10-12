import { z } from "zod";

export const objectIdSchema = z
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, "Invalid MongoDB ObjectId");

export const optionalUrlSchema = z
  .string()
  .url("Invalid URL")
  .or(z.literal(""))
  .optional();

export const requiredUrlSchema = z.string().url("Invalid URL");

export const slugSchema = z
  .string()
  .min(1, "Slug is required")
  .max(100)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase alphanumeric with hyphens"
  );

export const yearMonthSchema = z
  .string()
  .regex(/^\d{4}(-\d{2})?$/, "Date must be YYYY or YYYY-MM format");

export const stringArraySchema = z.array(z.string().trim().min(1)).default([]);
