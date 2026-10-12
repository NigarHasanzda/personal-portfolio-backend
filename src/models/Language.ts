import { Document, Schema, model } from "mongoose";

export interface ILanguage extends Document {
  language: string;
  level: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const languageSchema = new Schema<ILanguage>(
  {
    language: { type: String, required: true, trim: true },
    level: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

languageSchema.index({ order: 1 });

export const Language = model<ILanguage>("Language", languageSchema);
