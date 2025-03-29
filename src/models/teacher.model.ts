import pool from '../config/database';
import {Teacher, CreateTeacherDTO, TeacherResponse} from '../types/teacher.types';

export class TeacherModel {
  public async getAll(): Promise<Teacher[]> {
    const result = await pool.query('SELECT * FROM teachers ORDER BY id ASC');
    return result.rows;
  }

  public async createTeacher(createTeacherDTO: CreateTeacherDTO): Promise<TeacherResponse> {
    try {
      const existingTeacher = await pool.query(
        'SELECT * FROM teachers WHERE email = $1 OR contact_number = $2',
        [createTeacherDTO.email, createTeacherDTO.contact_number]
      );
      if (existingTeacher.rows.length > 0) {
        throw new Error('Teacher with this email or contact number already exists');
      }
    } catch (error) {
      console.error('Error checking existing teacher:', error);
      throw new Error('Database error occurred while checking existing teacher');
    }
    
    // check maximum number of teachers to be 40
    const maxTeachers = 40;
    const currentCountResult = await pool.query('SELECT COUNT(*) FROM teachers');
    const currentCount = parseInt(currentCountResult.rows[0].count, 10);
    if (currentCount >= maxTeachers) {
      return {
        success: false,
        message: 'Maximum number of teachers reached',
      }
    }
    
    const { name, email, subject, contact_number } = createTeacherDTO;
    const result = await pool.query(
      'INSERT INTO teachers (name, email, subject, contact_number) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, subject, contact_number]
    );
    return result.rows[0];
  }
}

export default new TeacherModel();