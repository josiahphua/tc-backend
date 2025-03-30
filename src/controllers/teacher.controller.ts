import { Request, Response } from "express";
import TeacherService from "../services/teacher.service";
import { CreateTeacherDTO } from "../types/teacher.types";

class TeacherController {
  private sendResponse(res: Response, response: any): void {
    if (!response.success) {
      res.status(400).json(response);
    } else {
      res.status(200).json(response);
    }
  }

  public async getAllTeachers(req: Request, res: Response): Promise<void> {
    const response = await TeacherService.getAllTeachers();
    return this.sendResponse(res, response);
  }

  public async registerTeacher(req: Request, res: Response): Promise<void> {
    const teacherFormData: CreateTeacherDTO = req.body;
    const response = await TeacherService.registerTeacher(teacherFormData);
    return this.sendResponse(res, response);
  }
}

export default new TeacherController();
