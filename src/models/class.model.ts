import pool from '../config/database';
import { Class, CreateClassDTO, ClassResponse } from '../types/class.types';

export class ClassModel {
  public async getAll(): Promise<Class[]> {
    const result = await pool.query(
      `SELECT * FROM classes
        JOIN teachers ON classes.form_teacher = teachers.name
        ORDER BY id ASC`
    );
    return result.rows;
  }
  
  public async CreateClass(createClassDTO: CreateClassDTO): Promise<ClassResponse> {
    try {
      const existingClass = await pool.query(
        'SELECT * FROM classes WHERE name = $1',
        [createClassDTO.name]
      );
      if (existingClass.rows.length > 0) {
        return {
          success: false,
          message: 'Class with this name already exists',
        }
      }
    } catch (error) {
      console.error('Error checking existing class:', error);
      return {
        success: false,
        message: 'Database error occurred while checking existing class',
      }
    }

    // check maximum number of classes to be 40
    const maxClasses = 40;
    const currentCountResult = await pool.query('SELECT COUNT(*) FROM classes');
    const currentCount = parseInt(currentCountResult.rows[0].count, 10);
    if (currentCount >= maxClasses) {
      return {
        success: false,
        message: 'Maximum number of classes reached',
      }
    }

    const { name, form_teacher, level } = createClassDTO;
    const result = await pool.query(
      'INSERT INTO classes (name, form_teacher, level) VALUES ($1, $2, $3) RETURNING *',
      [name, form_teacher, level]
    );
    return result.rows[0];
  }
  
  public async checkTeacherExists(teacherName: string): Promise<boolean> {
    const result = await pool.query(
      'SELECT * FROM teachers WHERE name = $1',
      [teacherName]
    );
    return result.rows.length > 0;
  }
}

export default new ClassModel();