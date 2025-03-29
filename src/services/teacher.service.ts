import { TeacherModel } from "../models/teacher.model";
import { Teacher, CreateTeacherDTO, TeacherResponse } from "../types/teacher.types";

export class TeacherService {
  private teacherModel: TeacherModel;

  constructor() {
    this.teacherModel = new TeacherModel();
  }
  
  public async getAllTeachers(): Promise<TeacherResponse> {
    try {
      const teachers = await this.teacherModel.getAll();
      return { data: teachers, success: true };
    } catch (error) {
      return this.handleError(error)
    }
  }
  
  public async registerTeacher(teacherFormData: CreateTeacherDTO): Promise<TeacherResponse> {
    try {
      return await this.teacherModel.createTeacher(teacherFormData);
    } catch (error) {
      return this.handleError(error)
    }
  }
  
  private handleError(error: unknown): TeacherResponse {
    console.error(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred' };
  }
}

export default new TeacherService();