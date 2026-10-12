import { z } from "zod";
import { stringArraySchema, yearMonthSchema } from "./common.validation";

export const createExperienceSchema = z.object({
  company: z.string().trim().min(1),
  position: z.string().trim().min(1),
  location: z.string().trim().min(1),
  startDate: yearMonthSchema,
  endDate: yearMonthSchema.nullable().optional(),
  isCurrent: z.boolean().optional(),
  responsibilities: stringArraySchema.optional(),
  technologies: stringArraySchema.optional(),
  order: z.number().int().min(0).optional(),
});

export const updateExperienceSchema = createExperienceSchema.partial();

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;
