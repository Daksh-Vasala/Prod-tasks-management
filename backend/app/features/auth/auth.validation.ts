import { z } from "zod";

export const registerSchema = z.object({
  userName: z
    .string()
    .trim()
    .min(3, "Username should contain atleast 3 characters")
    .max(30, "User name must be at most 30 characters"),
  email: z.email("Please provide valid email").trim().lowercase(),
  password: z
    .string()
    .min(8, "Password should be atleast 8 characters")
    .max(100, "Password must be at most 100 characters"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 8 characters")
    .max(15, "Phone number must be at most 100 characters"),
  firstName: z
    .string()
    .min(8, "First name at least 2 characters")
    .max(100, "First name must be at most 50 characters")
    .optional(),
  lastName: z
    .string()
    .min(8, "Last name at least 2 characters")
    .max(100, "Last name must be at most 50 characters")
    .optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
