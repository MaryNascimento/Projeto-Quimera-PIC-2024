import { injectable } from "tsyringe";
import { TeacherRepositoryTypes } from "../types/teacher.repositories.types";
import { TeacherTypes } from "../types/teacher.models.types";
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
    return await Teacher.findByIdAndUpdate(id, teacher, { new: true });
  }
  async delete(id: string) {
    await Teacher.findByIdAndDelete(id);
  }
}
