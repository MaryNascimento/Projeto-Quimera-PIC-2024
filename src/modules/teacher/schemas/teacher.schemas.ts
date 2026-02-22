import { Document, model, Schema } from "mongoose";

import bcrypt from "bcryptjs";
import { TeacherTypes } from "../types/teacher.schemas.types";

const TeacherSchema = new Schema<TeacherTypes>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

TeacherSchema.pre<TeacherTypes & Document>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const Teacher = model<TeacherTypes>("Teacher", TeacherSchema);
