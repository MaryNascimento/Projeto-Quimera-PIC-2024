import { TeacherTypes } from "../../teacher/types/teacher.models.types";

export interface AuthServiceTypes {
  login(
    email: string,
    password: string,
  ): Promise<{
    teacher: TeacherTypes;
    token: string;
  }>;
}
