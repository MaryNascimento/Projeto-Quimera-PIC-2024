import { injectable } from "tsyringe";
import { TeacherRepositoryTypes } from "../types/teacher.repositories.types";
import { TeacherTypes } from "../types/teacher.schemas.types";
import { Teacher } from "../schemas/teacher.schemas";

@injectable()
export class TeacherRepository implements TeacherRepositoryTypes {
  async create(teacher: TeacherTypes) {
    const newTeacher = new Teacher(teacher);
    return await newTeacher.save();
  }
  async findById(id: string) {
    return await Teacher.findById(id);
  }
  async findByEmail(email: string) {
    return await Teacher.findOne({ email }).select("+password");
  }
  async findAll() {
    return await Teacher.find();
  }
  async update(id: string, teacher: TeacherTypes) {
    const doc = await Teacher.findById(id).select("+password");
    if (!doc) return null;

    // copy provided fields onto the document so pre('save') hooks run (eg. password hashing)
    Object.keys(teacher).forEach((key) => {
      // @ts-ignore
      doc[key] = (teacher as any)[key];
    });

    return await doc.save();
  }
  async delete(id: string) {
    await Teacher.findByIdAndDelete(id);
  }
}
