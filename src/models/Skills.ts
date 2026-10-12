import { Document, Schema, model } from "mongoose";

export interface ISkills extends Document {
  programmingLanguages: string[];
  frameworks: string[];
  styling: string[];
  stateManagementAndApi: string[];
  toolsAndPlatforms: string[];
  aiTools: string[];
  methodologies: string[];
  personalSkills: string[];
  createdAt: Date;
  updatedAt: Date;
}

const skillsSchema = new Schema<ISkills>(
  {
    programmingLanguages: { type: [String], default: [] },
    frameworks: { type: [String], default: [] },
    styling: { type: [String], default: [] },
    stateManagementAndApi: { type: [String], default: [] },
    toolsAndPlatforms: { type: [String], default: [] },
    aiTools: { type: [String], default: [] },
    methodologies: { type: [String], default: [] },
    personalSkills: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Skills = model<ISkills>("Skills", skillsSchema);
