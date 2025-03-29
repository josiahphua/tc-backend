import { Request, Response } from 'express';
import ClassService from "../services/class.service";
import { CreateClassDTO } from "../types/class.types";

class ClassController {
  public async getAllClasses(req: Request, res: Response): Promise<void> {
    const response = await ClassService.getAllClasses();
    return this.sendResponse(res, response);
  }

  public async createClass(req: Request, res: Response): Promise<void> {
    const classFormData: CreateClassDTO = req.body;
    const response = await ClassService.createClass(classFormData);
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

export default new ClassController();