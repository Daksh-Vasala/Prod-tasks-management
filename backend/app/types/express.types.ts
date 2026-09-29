import { Request } from "express";
import { UserRole } from "./auth.types";

export interface AuthRequest extends Request {
  userId?: number;
  userRole?: UserRole;
  token?: string;
}
