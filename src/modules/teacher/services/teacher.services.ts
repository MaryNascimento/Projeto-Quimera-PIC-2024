import { inject, injectable } from "tsyringe";
import { TeacherServiceTypes } from "../types/teacher.services.types";
import { TeacherRepositoryTypes } from "../types/teacher.repositories.types";
import { TeacherTypes } from "../types/teacher.schemas.types";
import ServiceError, { ServiceErrorType } from "../../../shared/errors/ServiceError";
import { ErrorCode } from "../../../shared/errors/errorCodes";

// Service layer: validate business rules and delegate to repository

@injectable()
export class TeacherService implements TeacherServiceTypes {
  constructor(
    @inject("TeacherRepository")
    private teacherRepository: TeacherRepositoryTypes,
  ) {}

  async createTeacher(teacher: TeacherTypes) {
    if (!teacher.email || !teacher.password || !teacher.name) {
      throw new ServiceError(
        "Campos obrigatórios do professor ausentes",
        ServiceErrorType.BadRequest,
        undefined,
        ErrorCode.TEACHER_MISSING_FIELDS,
      );
    }

    // ensure unique email
    const existing = await this.teacherRepository.findByEmail(teacher.email);
    if (existing) {
      throw new ServiceError(
        "Conflito: email já está em uso",
        ServiceErrorType.Conflict,
        undefined,
        ErrorCode.TEACHER_EMAIL_CONFLICT,
      );
    }

    return this.teacherRepository.create(teacher);
  }
  async getTeacherById(id: string) {
    const teacher = await this.teacherRepository.findById(id);
    if (!teacher)
      throw new ServiceError(
        "Professor não encontrado",
        ServiceErrorType.NotFound,
        undefined,
        ErrorCode.TEACHER_NOT_FOUND,
      );
    return teacher;
  }
  async getAllTeacher() {
    return this.teacherRepository.findAll();
  }
  async updateTeacher(id: string, teacher: TeacherTypes) {
    const existing = await this.teacherRepository.findById(id);
    if (!existing)
      throw new ServiceError(
        "Professor não encontrado",
        ServiceErrorType.NotFound,
        undefined,
        ErrorCode.TEACHER_NOT_FOUND,
      );
    // prevent email collision
    if (teacher.email && teacher.email !== (existing as any).email) {
      const byEmail = await this.teacherRepository.findByEmail(teacher.email);
      if (byEmail)
        throw new ServiceError(
          "Conflito: e-mail já está em uso",
          ServiceErrorType.Conflict,
          undefined,
          ErrorCode.TEACHER_EMAIL_CONFLICT,
        );
    }
    return this.teacherRepository.update(id, teacher);
  }
  async deleteTeacher(id: string) {
    const existing = await this.teacherRepository.findById(id);
    if (!existing)
      throw new ServiceError(
        "Professor não encontrado",
        ServiceErrorType.NotFound,
        undefined,
        ErrorCode.TEACHER_NOT_FOUND,
      );
    return this.teacherRepository.delete(id);
  }
}
