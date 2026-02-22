import { Request, Response } from "express";

import { inject, injectable } from "tsyringe";
import { TeacherServiceTypes } from "../types/teacher.services.types";
import { TeacherTypes } from "../types/teacher.models.types";

@injectable()
export class TeacherController {
  constructor(
    @inject("TeacherService") private teacherService: TeacherServiceTypes,
  ) {}

  async createTeacher(req: Request, res: Response) {
    try {
      const teacher: TeacherTypes = req.body;
      const newTeacher = await this.teacherService.createTeacher(teacher);
      res.status(201).json(newTeacher);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  }

  async getTeacherById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const teacher = await this.teacherService.getTeacherById(id);

      if (!teacher) {
        res.status(404).json({ message: "Teacher not Found" });
        return;
      }

      res.status(200).json(teacher);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving teacher" });
    }
  }

  async getAllTeachers(req: Request, res: Response) {
    try {
      const teachers = await this.teacherService.getAllTeacher();
      res.status(200).json(teachers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error return teachers list" });
    }
  }

  async updateTeacher(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const teacher: TeacherTypes = req.body;
      const updateTeacher = await this.teacherService.updateTeacher(
        id,
        teacher,
      );

      if (!updateTeacher) {
        res.status(404).json({ message: "Teacher not found" });
        return;
      }

      res.status(200).json(updateTeacher);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating teacher" });
    }
  }

  async deleteTeacher(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const teacher = await this.teacherService.getTeacherById(id);

      if (!teacher) {
        res.status(404).json({ message: "Teacher not found" });
        return;
      }

      await this.teacherService.deleteTeacher(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting teacher" });
    }
  }
}
