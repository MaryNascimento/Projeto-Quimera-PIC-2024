import { ITeacher } from "../models/ITeacher";

export interface IAuthService {
  login(
    email: string,
    password: string
  ): Promise<{
    teacher: ITeacher;
    token: string;
  }>;
}
