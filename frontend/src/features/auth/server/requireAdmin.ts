import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getMeService } from "../services/auth.service";
import { User, UserRole } from "../types/auth.types";

export async function requireAdmin(): Promise<User> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let user: User;
  try {
    const res = await getMeService(token);
    user = res.data;
  } catch (error) {
    console.error("Admin authentication failed:", error);
    redirect("/login");
  }

  if (user.userRole !== UserRole.ADMIN) {
    redirect("/tasks");
  }

  return user;
}