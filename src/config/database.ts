import mongoose from "mongoose";
import { env } from "./env";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      // Render/cloud hosts: prefer IPv4 to avoid Atlas TLS handshake issues with IPv6
      family: 4,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed.");
    console.error(
      "Check Atlas: Network Access (allow 0.0.0.0/0 for Render), Database User password, and MONGODB_URI (URL-encode special chars in password)."
    );
    throw error;
  }
};
