import { ITeacher } from "../models/ITeacher";

export interface ITeacherService {
  createTeacher(teacher: ITeacher): Promise<ITeacher>;
  getTeacherById(id: string): Promise<ITeacher | null>;
  getAllTeacher(): Promise<ITeacher[]>;
  updateTeacher(id: string, teacher: ITeacher): Promise<ITeacher | null>;
  deleteTeacher(id: string): Promise<void>;
}
