import { Router } from "express";
import { TeacherRepository } from "../repositories/TeacherRepository";
import { TeacherService } from "../services/TeacherService";
import { TeacherController } from "../controllers/TeacherController";

const router = Router();

const teacherRepository = new TeacherRepository();
const teacherService = new TeacherService(teacherRepository);
const teacherController = new TeacherController(teacherService);

router.post("/", (req, res) => teacherController.createTeacher(req, res));
router.get("/:id", (req, res) => teacherController.getTeacherById(req, res));
router.get("/", (req, res) => teacherController.getAllTeachers(req, res));
router.put("/:id", (req, res) => teacherController.updateTeacher(req, res));
router.delete("/:id", (req, res) => teacherController.deleteTeacher(req, res));

export default router;
