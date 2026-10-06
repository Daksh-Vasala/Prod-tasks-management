import { z } from "zod";

export const updateUserSchema = z.object({
  userName: z.string().trim().min(3).max(30).optional(),
  email: z.string().trim().email().optional(),
  phoneNumber: z.string().trim().min(10).max(15).optional(),
  firstName: z.string().trim().min(2).max(50).nullable().optional(),
  lastName: z.string().trim().min(2).max(50).nullable().optional(),
});