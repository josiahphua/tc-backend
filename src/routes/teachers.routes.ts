import express from "express";
import TeacherController from "../controllers/teacher.controller";

const router = express.Router();

router.get(
  "/teachers",
  TeacherController.getAllTeachers.bind(TeacherController),
);
router.post(
  "/teachers",
  TeacherController.registerTeacher.bind(TeacherController),
);

export default router;
