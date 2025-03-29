import { ClassModel } from "../models/class.model";
import { Class, CreateClassDTO, ClassResponse } from "../types/class.types";

class ClassService {
  private classModel: ClassModel;

  constructor() {
    this.classModel = new ClassModel();
  }

  public async getAllClasses(): Promise<ClassResponse> {
    try {
      const classes = await this.classModel.getAll();
      return { data: classes, success: true };
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async createClass(classFormData: CreateClassDTO): Promise<ClassResponse> {
    try {
      const teacherExists = await this.classModel.checkTeacherExists(classFormData.form_teacher);
      if (!teacherExists) {
        return { success: false, error: 'Teacher does not exist' };
      }
      return await this.classModel.CreateClass(classFormData);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): ClassResponse {
    console.error(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred' };
  }
}

export default new ClassService();