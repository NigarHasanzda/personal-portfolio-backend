import { z } from "zod";
import { optionalUrlSchema } from "./common.validation";

export const createAchievementSchema = z.object({
  title: z.string().trim().min(1),
  year: z.number().int().min(1900).max(2100),
  result: z.string().trim().min(1),
  description: z.string().trim().optional(),
  image: optionalUrlSchema,
  certificateUrl: optionalUrlSchema,
  order: z.number().int().min(0).optional(),
});

export const updateAchievementSchema = createAchievementSchema.partial();

export type CreateAchievementInput = z.infer<typeof createAchievementSchema>;
export type UpdateAchievementInput = z.infer<typeof updateAchievementSchema>;
