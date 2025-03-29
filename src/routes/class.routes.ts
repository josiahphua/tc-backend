import express from "express";
import ClassController from "../controllers/class.controller";

const router = express.Router();

router.get("/", ClassController.getAllClasses);
router.post("/", ClassController.createClass);

export default router;