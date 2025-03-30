import express from "express";
import ClassController from "../controllers/class.controller";

const router = express.Router();

router.get("/classes", ClassController.getAllClasses.bind(ClassController));
router.post("/classes", ClassController.createClass.bind(ClassController));

export default router;
