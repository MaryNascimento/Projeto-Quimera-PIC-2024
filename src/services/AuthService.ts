import { inject, injectable } from "tsyringe";
import { IAuthService } from "../interfaces/service/IAuthService";
import { ITeacherRepository } from "../interfaces/repositories/ITeacherRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { ITeacher } from "../interfaces/models/ITeacher";
import { Document } from "mongoose";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject("TeacherRepository") private teacherRepository: ITeacherRepository
  ) {}

  async login(email: string, password: string) {
    const teacher = (await this.teacherRepository.findByEmail(
      email
    )) as ITeacher & Document;

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

    return token;
  }
}
