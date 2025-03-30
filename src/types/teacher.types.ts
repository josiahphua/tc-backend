export interface Teacher {
  id: number;
  name: string;
  email: string;
  subject: Subject;
  contactNumber: string;
  created_at: Date;
  updated_at: Date;
}

export interface DBTeacher {
  id: number;
  name: string;
  email: string;
  subject: Subject;
  contact_number: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTeacherDTO {
  name: string;
  subject: Subject;
  email: string;
  contactNumber: string;
}

export interface TeacherResponse {
  data?: Teacher[];
  success: boolean;
  message?: string;
  error?: string;
}

export enum Subject {
  English = "English",
  MotherTongue = "Mother Tongue Language",
  Mathematics = "Mathematics",
  Science = "Science",
  Art = "Art",
  Music = "Music",
  PhysicalEducation = "Physical Education",
  SocialStudies = "Social Studies",
  CharacterAndCitizenshipEducation = "Character and Citizenship Education",
}
