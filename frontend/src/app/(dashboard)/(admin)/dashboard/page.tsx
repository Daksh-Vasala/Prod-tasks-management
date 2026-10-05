import AdminRoute from "@/features/auth/components/AdminRoute";
import { UserRole } from "@/features/auth/types/auth.types";
import { getMeService } from "@/features/auth/services/auth.service";
import { getDashboardStatsService } from "@/features/dashboard/services/dashboard.service";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { redirect } from "next/navigation";
import DashboardCards from "./components/DashboardCards";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let currentUser;
  try {
    currentUser = await getMeService(token);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      redirect("/login");
    }
    throw error;
  }

  if (currentUser.data.userRole !== UserRole.ADMIN) {
    redirect("/tasks");
  }

  const res = await getDashboardStatsService(token);

  return (
    <AdminRoute>
      <main className="px-4 pt-6 sm:px-10 lg:px-20">
        <h1 className="text-2xl font-semibold text-zinc-900 mb-4">
          Admin Dashboard
        </h1>
        <DashboardCards stats={res.data} />
      </main>
    </AdminRoute>
  );
}
