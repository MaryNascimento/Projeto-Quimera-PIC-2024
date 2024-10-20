import { Router } from "express";
import { TeacherController } from "../controllers/TeacherController";
import { container } from "tsyringe";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

const teacherController = container.resolve(TeacherController);

router.post("/", teacherController.createTeacher.bind(teacherController));
router.get(
  "/:id",
  authMiddleware,
  teacherController.getTeacherById.bind(teacherController)
);
router.get(
  "/",
  authMiddleware,
  teacherController.getAllTeachers.bind(teacherController)
);
router.put(
  "/:id",
  authMiddleware,
  teacherController.updateTeacher.bind(teacherController)
);
router.delete(
  "/:id",
  authMiddleware,
  teacherController.deleteTeacher.bind(teacherController)
);

export default router;
