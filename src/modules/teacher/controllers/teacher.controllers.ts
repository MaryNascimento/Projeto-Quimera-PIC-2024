import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { TeacherServiceTypes } from "../types/teacher.services.types";
import { TeacherTypes } from "../types/teacher.schemas.types";
import { asyncHandler } from "../../../shared/asyncHandler";

@injectable()
export class TeacherController {
  constructor(
    @inject("TeacherService") private teacherService: TeacherServiceTypes,
  ) {}

  createTeacher = asyncHandler(async (req: Request, res: Response) => {
    const teacher: TeacherTypes = req.body;
    const newTeacher = await this.teacherService.createTeacher(teacher);
    res.status(201).json(newTeacher);
  });

  getTeacherById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const teacher = await this.teacherService.getTeacherById(id);
    res.status(200).json(teacher);
  });

  getAllTeachers = asyncHandler(async (req: Request, res: Response) => {
    const teachers = await this.teacherService.getAllTeacher();
    res.status(200).json(teachers);
  });

  updateTeacher = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const teacher: TeacherTypes = req.body;
    const updateTeacher = await this.teacherService.updateTeacher(id, teacher);
    res.status(200).json(updateTeacher);
  });

  deleteTeacher = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.teacherService.deleteTeacher(id);
    res.status(204).send();
  });
}
