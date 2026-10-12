import { Document, Schema, model } from "mongoose";

export interface IAchievement extends Document {
  title: string;
  year: number;
  result: string;
  description: string;
  image: string;
  certificateUrl: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const achievementSchema = new Schema<IAchievement>(
  {
    title: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    result: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    image: { type: String, default: "", trim: true },
    certificateUrl: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

achievementSchema.index({ order: 1 });

export const Achievement = model<IAchievement>("Achievement", achievementSchema);
