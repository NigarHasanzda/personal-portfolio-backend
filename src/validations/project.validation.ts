import { z } from "zod";
import { optionalUrlSchema, slugSchema, stringArraySchema } from "./common.validation";

export const createProjectSchema = z.object({
  title: z.string().trim().min(1),
  slug: slugSchema,
  shortDescription: z.string().trim().min(1),
  description: z.string().trim().optional(),
  image: optionalUrlSchema,
  gallery: z.array(z.string().url()).optional(),
  technologies: stringArraySchema.optional(),
  githubUrl: optionalUrlSchema,
  liveUrl: optionalUrlSchema,
  category: z.string().trim().optional(),
  featured: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export const projectQuerySchema = z.object({
  featured: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
  category: z.string().trim().optional(),
  technology: z.string().trim().optional(),
  search: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectQueryInput = z.infer<typeof projectQuerySchema>;
