import ClassModel from "../models/class.model";
import { CreateClassDTO, ClassResponse } from "../types/class.types";

class ClassService {
  public async getAllClasses(): Promise<ClassResponse> {
    try {
      return await ClassModel.getAll();
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async createClass(
    classFormData: CreateClassDTO,
  ): Promise<ClassResponse> {
    if (!classFormData.teacherEmail) {
      return { success: false, error: "Form teacher email is required" };
    }

    try {
      const teacherExists = await ClassModel.checkTeacherExists(
        classFormData.teacherEmail,
      );
      console.log("Teacher exists:", teacherExists);
      if (!teacherExists) {
        return {
          success: false,
          error: `Teacher with email ${classFormData.teacherEmail} not found`,
        };
      }
      return await ClassModel.CreateClass(classFormData);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): ClassResponse {
    console.error(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
}

export default new ClassService();
