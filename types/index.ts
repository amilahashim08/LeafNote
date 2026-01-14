export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  // review metadata (optional in frontend)
  reviewed?: boolean;
  reviewedBy?: string | null;
  reviewedAt?: Date | string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteFormData {
  title: string;
  content: string;
  tags: string[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}


