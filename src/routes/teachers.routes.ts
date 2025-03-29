import express from "express";
import TeacherController from "../controllers/teacher.controller";

const router = express.Router();

router.get("/", TeacherController.getAllTeachers);
router.post("/", TeacherController.registerTeacher);

export default router;