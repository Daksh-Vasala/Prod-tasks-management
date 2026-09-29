export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  userRole?: UserRole;
  firstName?: string;
  lastName?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export enum UserRole {
  SUBSCRIBER = "subscriber",
  ADMIN = "admin",
}

export interface User {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
  userRole: UserRole;
  firstName?: string;
  lastName?: string;
}
