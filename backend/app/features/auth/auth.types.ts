import { UserRole } from "@/app/types/auth.types";

export interface RegisterInput {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  userRole: UserRole;
  firstName?: string;
  lastName?: string;
}

export interface UpdateProfileInput {
  userName?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
}
