import { inject, injectable } from "tsyringe";
import { ITeacher } from "../interfaces/models/ITeacher";
import { ITeacherRepository } from "../interfaces/repositories/ITeacherRepository";
import { ITeacherService } from "../interfaces/service/ITeacherService";

@injectable()
export class TeacherService implements ITeacherService {
  constructor(
    @inject("TeacherRepository") private teacherRepository: ITeacherRepository
  ) {}

  async createTeacher(teacher: ITeacher) {
    return this.teacherRepository.create(teacher);
  }
  async getTeacherById(id: string) {
    return this.teacherRepository.findById(id);
  }
  async getAllTeacher() {
    return this.teacherRepository.findAll();
  }
  async updateTeacher(id: string, teacher: ITeacher) {
    return this.teacherRepository.update(id, teacher);
  }
  async deleteTeacher(id: string) {
    return this.teacherRepository.delete(id);
  }
}
