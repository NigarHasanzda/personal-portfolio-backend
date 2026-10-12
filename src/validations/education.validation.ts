import { z } from "zod";
import { yearMonthSchema } from "./common.validation";

export const createEducationSchema = z.object({
  institution: z.string().trim().min(1),
  degree: z.string().trim().min(1),
  type: z.enum(["university", "course", "bootcamp", "certification"]),
  startDate: yearMonthSchema,
  endDate: yearMonthSchema.nullable().optional(),
  description: z.string().trim().optional(),
  order: z.number().int().min(0).optional(),
});

export const updateEducationSchema = createEducationSchema.partial();

export type CreateEducationInput = z.infer<typeof createEducationSchema>;
export type UpdateEducationInput = z.infer<typeof updateEducationSchema>;
