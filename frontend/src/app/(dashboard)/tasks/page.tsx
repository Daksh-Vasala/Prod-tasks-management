import { getAllTasksService } from "@/features/tasks/services/tasks.service";
import TaskGrid from "./components/TaskGrid";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TaskFilters, TaskStatus } from "@/features/tasks/types/tasks.types";

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    userId?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}) {
  const params = await searchParams;

  const filters = {
    status: params.status as TaskStatus | undefined,
    userId: params.userId ? Number(params.userId) : undefined,
    page: params.page ? Number(params.page) : undefined,
    limit: params.limit ? Number(params.limit) : undefined,
    sortBy: params.sortBy as TaskFilters["sortBy"],
    sortOrder: params.sortOrder as TaskFilters["sortOrder"],
  };

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let res;

  try {
    res = await getAllTasksService(token, filters);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    redirect("/login");
  }

  return (
    <main className="px-4 pt-1 sm:px-10 lg:px-20">
      <TaskGrid initialTasks={res.data} pagination={res.pagination} />
    </main>
  );
}
