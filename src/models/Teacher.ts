import { Document, model, Schema } from "mongoose";
import { ITeacher } from "../interfaces/models/ITeacher";
import bcrypt from "bcryptjs";

const TeacherSchema = new Schema<ITeacher>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

TeacherSchema.pre<ITeacher & Document>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const Teacher = model<ITeacher>("Teacher", TeacherSchema);
