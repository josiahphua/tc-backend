import { Request, Response } from 'express';
import TeacherService from "../services/teacher.service";
import { CreateTeacherDTO } from "../types/teacher.types";

class TeacherController {
  public async getAllTeachers(req: Request, res: Response): Promise<void> {
    const reponse = await TeacherService.getAllTeachers();
    return this.sendResponse(res, reponse);
  }
  
  public async registerTeacher(req: Request, res: Response): Promise<void> {
    const teacherFormData: CreateTeacherDTO = req.body;
    const response = await TeacherService.registerTeacher(teacherFormData);
    return this.sendResponse(res, response);
  }
  
  private sendResponse(res: Response, response: any): void {
    if (!response.success) {
      res.status(400).json(response);
    } else {
      res.status(200).json(response);
    }
  }
}

export default new TeacherController();