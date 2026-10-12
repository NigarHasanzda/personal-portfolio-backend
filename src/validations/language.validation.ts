import { z } from "zod";

export const createLanguageSchema = z.object({
  language: z.string().trim().min(1),
  level: z.string().trim().min(1),
  order: z.number().int().min(0).optional(),
});

export const updateLanguageSchema = createLanguageSchema.partial();

export type CreateLanguageInput = z.infer<typeof createLanguageSchema>;
export type UpdateLanguageInput = z.infer<typeof updateLanguageSchema>;
