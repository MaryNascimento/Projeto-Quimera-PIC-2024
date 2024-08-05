import { Document, model, Schema } from "mongoose";
import { ITeacher } from "../interfaces/models/ITeacher";

const TeacherSchema = new Schema<ITeacher>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: false },
});

export const Teacher = model<ITeacher>("Teacher", TeacherSchema);
