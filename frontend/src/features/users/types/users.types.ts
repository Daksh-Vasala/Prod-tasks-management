import { UserRole } from "@/features/auth/types/auth.types";

export interface User {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
  userRole: UserRole
  isActive: boolean;
  firstName?: string;
  lastName?: string;
}
