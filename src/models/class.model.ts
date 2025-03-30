import pool from "../config/database";
import {
  Class,
  CreateClassDTO,
  ClassResponse,
  DBClass,
} from "../types/class.types";

export class ClassModel {
  public async getAll(): Promise<Class[]> {
    const result = await pool.query<DBClass>(
      `SELECT * FROM classes
        JOIN teachers ON classes.form_teacher = teachers.email
        ORDER BY id ASC`,
    );
    return result.rows.map(
      (row): Class => ({
        id: row.id,
        name: row.name,
        teacherEmail: row.teacher_email,
        level: row.level,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }),
    );
  }

  public async CreateClass(
    createClassFormData: CreateClassDTO,
  ): Promise<ClassResponse> {
    try {
      const existingClass = await pool.query(
        "SELECT * FROM classes WHERE name = $1",
        [createClassFormData.name],
      );
      if (existingClass.rows.length > 0) {
        return {
          success: false,
          message: "Class with this name already exists",
        };
      }
    } catch (error) {
      console.error("Error checking existing class:", error);
      return {
        success: false,
        message: "Database error occurred while checking existing class",
      };
    }

    // check maximum number of classes to be 40
    const maxClasses = 40;
    const currentCountResult = await pool.query("SELECT COUNT(*) FROM classes");
    const currentCount = parseInt(currentCountResult.rows[0].count, 10);
    if (currentCount >= maxClasses) {
      return {
        success: false,
        message: "Maximum number of classes reached",
      };
    }

    const { name, teacherEmail, level } = createClassFormData;
    const result = await pool.query<DBClass>(
      "INSERT INTO classes (name, teacher_email, level) VALUES ($1, $2, $3) RETURNING *",
      [name, teacherEmail, level],
    );
    return {
      success: true,
      data: [
        {
          id: result.rows[0].id,
          name: result.rows[0].name,
          teacherEmail: result.rows[0].teacher_email,
          level: result.rows[0].level,
          created_at: result.rows[0].created_at,
          updated_at: result.rows[0].updated_at,
        },
      ],
    };
  }

  public async checkTeacherExists(teacherEmail: string): Promise<boolean> {
    const result = await pool.query("SELECT * FROM teachers WHERE email = $1", [
      teacherEmail,
    ]);
    return result.rows.length > 0;
  }
}

export default new ClassModel();
