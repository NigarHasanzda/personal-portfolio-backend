import { z } from "zod";
import { stringArraySchema } from "./common.validation";

export const updateSkillsSchema = z.object({
  programmingLanguages: stringArraySchema.optional(),
  frameworks: stringArraySchema.optional(),
  styling: stringArraySchema.optional(),
  stateManagementAndApi: stringArraySchema.optional(),
  toolsAndPlatforms: stringArraySchema.optional(),
  aiTools: stringArraySchema.optional(),
  methodologies: stringArraySchema.optional(),
  personalSkills: stringArraySchema.optional(),
});

export type UpdateSkillsInput = z.infer<typeof updateSkillsSchema>;
