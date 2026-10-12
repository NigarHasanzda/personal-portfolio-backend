import { Document, Schema, model } from "mongoose";

export interface IProfile extends Document {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  professionalSummary: string;
  profileImage: string;
  resumeUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    location: { type: String, required: true, trim: true },
    github: { type: String, default: "", trim: true },
    linkedin: { type: String, default: "", trim: true },
    professionalSummary: { type: String, default: "", trim: true },
    profileImage: { type: String, default: "", trim: true },
    resumeUrl: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

export const Profile = model<IProfile>("Profile", profileSchema);
