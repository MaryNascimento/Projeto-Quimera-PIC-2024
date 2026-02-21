import { inject, injectable } from "tsyringe";
import { TeacherServiceTypes } from "../types/teacher.services.types";
import { TeacherRepositoryTypes } from "../types/teacher.repositories.types";
import { TeacherTypes } from "../types/teacher.models.types";

@injectable()
export class TeacherService implements TeacherServiceTypes {
  constructor(
    @inject("TeacherRepository")
    private teacherRepository: TeacherRepositoryTypes,
  ) {}

  async createTeacher(teacher: TeacherTypes) {
    return this.teacherRepository.create(teacher);
  }
  async getTeacherById(id: string) {
    return this.teacherRepository.findById(id);
  }
  async getAllTeacher() {
    return this.teacherRepository.findAll();
  }
  async updateTeacher(id: string, teacher: TeacherTypes) {
    return this.teacherRepository.update(id, teacher);
  }
  async deleteTeacher(id: string) {
    return this.teacherRepository.delete(id);
  }
}
