import { ITeacher } from "../models/ITeacher";

export interface ITeacherRepository {
  create(teacher: ITeacher): Promise<ITeacher>;
  findById(id: string): Promise<ITeacher | null>;
  findByEmail(email: string): Promise<ITeacher | null>;
  findAll(): Promise<ITeacher[]>;
  update(id: string, teacher: ITeacher): Promise<ITeacher | null>;
  delete(id: string): Promise<void>;
}
