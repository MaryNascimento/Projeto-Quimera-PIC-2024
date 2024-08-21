import { ITeacher } from "../interfaces/models/ITeacher";
import { ITeacherRepository } from "../interfaces/repositories/ITeacherRepository";
import { Teacher } from "../models/Teacher";

export class TeacherRepository implements ITeacherRepository {
  async create(teacher: ITeacher) {
    const newTeacher = new Teacher(teacher);
    return await newTeacher.save();
  }
  async findById(id: string) {
    return await Teacher.findById(id);
  }
  async findAll() {
    return await Teacher.find();
  }
  async update(id: string, teacher: ITeacher) {
    return await Teacher.findByIdAndUpdate(id, teacher, { new: true });
  }
  async delete(id: string) {
    await Teacher.findByIdAndDelete(id);
  }
}