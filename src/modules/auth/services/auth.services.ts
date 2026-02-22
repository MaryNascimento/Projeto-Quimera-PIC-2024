import { inject, injectable } from "tsyringe";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { Document } from "mongoose";
import { AuthServiceTypes } from "../types/auth.services.types";
import { TeacherRepositoryTypes } from "../../teacher/types/teacher.repositories.types";
import { TeacherTypes } from "../../teacher/types/teacher.schemas.types";

@injectable()
export class AuthService implements AuthServiceTypes {
  constructor(
    @inject("TeacherRepository")
    private teacherRepository: TeacherRepositoryTypes,
  ) {}

  async login(email: string, password: string) {
    const teacher = (await this.teacherRepository.findByEmail(
      email,
    )) as TeacherTypes & Document;

    if (!teacher) {
      throw new Error("Email ou senha incorretos");
    }

    const passwordMatch = await compare(password, teacher.password);
    if (!passwordMatch) {
      throw new Error("Email ou senha incorretos");
    }

    const token = sign({ id: teacher._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    return {
      teacher,
      token,
    };
  }
}
