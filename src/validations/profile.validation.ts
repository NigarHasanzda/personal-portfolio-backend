import { z } from "zod";
import { optionalUrlSchema } from "./common.validation";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1).optional(),
  title: z.string().trim().min(1).optional(),
  phone: z.string().trim().min(1).optional(),
  email: z.string().trim().email().optional(),
  location: z.string().trim().min(1).optional(),
  github: optionalUrlSchema,
  linkedin: optionalUrlSchema,
  professionalSummary: z.string().trim().optional(),
  profileImage: optionalUrlSchema,
  resumeUrl: optionalUrlSchema,
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
