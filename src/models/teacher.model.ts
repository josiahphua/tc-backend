import pool from "../config/database";
import {
  Teacher,
  CreateTeacherDTO,
  TeacherResponse,
  DBTeacher,
} from "../types/teacher.types";

export class TeacherModel {
  public async getAll(): Promise<Teacher[]> {
    const { rows } = await pool.query<DBTeacher>(
      "SELECT * FROM teachers ORDER BY id ASC",
    );
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      subject: row.subject,
      contactNumber: row.contact_number,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));
  }

  public async createTeacher(
    createTeacherDTO: CreateTeacherDTO,
  ): Promise<TeacherResponse> {
    try {
      const existingTeacher = await pool.query<DBTeacher>(
        "SELECT * FROM teachers WHERE email = $1 OR contact_number = $2",
        [createTeacherDTO.email, createTeacherDTO.contactNumber],
      );
      if (existingTeacher.rows.length > 0) {
        return {
          success: false,
          message: "Teacher with this email or contact number already exists",
        };
      }
    } catch (error) {
      console.error("Error checking existing teacher:", error);
      return { success: false, message: "Error checking existing teacher" };
    }

    // check maximum number of teachers to be 40
    const maxTeachers = 40;
    const currentCountResult = await pool.query(
      "SELECT COUNT(*) FROM teachers",
    );
    const currentCount = parseInt(currentCountResult.rows[0].count, 10);
    if (currentCount >= maxTeachers) {
      return {
        success: false,
        message: "Maximum number of teachers reached",
      };
    }

    const { name, email, subject, contactNumber } = createTeacherDTO;
    const result = await pool.query<DBTeacher>(
      "INSERT INTO teachers (name, email, subject, contact_number) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, subject, contactNumber],
    );
    return {
      success: true,
      data: [
        {
          id: result.rows[0].id,
          name: result.rows[0].name,
          email: result.rows[0].email,
          subject: result.rows[0].subject,
          contactNumber: result.rows[0].contact_number,
          created_at: result.rows[0].created_at,
          updated_at: result.rows[0].updated_at,
        },
      ],
    };
  }
}

export default new TeacherModel();
