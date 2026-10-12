import { Document, Schema, model } from "mongoose";

export type EducationType = "university" | "course" | "bootcamp" | "certification";

export interface IEducation extends Document {
  institution: string;
  degree: string;
  type: EducationType;
  startDate: string;
  endDate: string | null;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const educationSchema = new Schema<IEducation>(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["university", "course", "bootcamp", "certification"],
      required: true,
    },
    startDate: { type: String, required: true, trim: true },
    endDate: { type: String, default: null, trim: true },
    description: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

educationSchema.index({ order: 1 });

export const Education = model<IEducation>("Education", educationSchema);
