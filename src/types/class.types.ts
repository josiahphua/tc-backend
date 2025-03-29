export interface Class {
  id: number;
  name: string;
  form_teacher: string;
  level: ClassLevel;
  created_at: Date;
  updated_at: Date;
}

export interface CreateClassDTO {
  name: string;
  form_teacher: string;
  level: ClassLevel;
}

export interface ClassResponse {
  data?: Class[];
  success: boolean;
  message?: string;
  error?: string;
}

export enum ClassLevel {
  Primary1 = 'Primary 1',
  Primary2 = 'Primary 2',
  Primary3 = 'Primary 3',
  Primary4 = 'Primary 4',
  Primary5 = 'Primary 5',
  Primary6 = 'Primary 6',
}