import { Document, Schema, model } from "mongoose";

export interface IExperience extends Document {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  responsibilities: string[];
  technologies: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    startDate: { type: String, required: true, trim: true },
    endDate: { type: String, default: null, trim: true },
    isCurrent: { type: Boolean, default: false },
    responsibilities: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

experienceSchema.index({ order: 1 });
experienceSchema.index({ isCurrent: -1, startDate: -1 });

export const Experience = model<IExperience>("Experience", experienceSchema);
