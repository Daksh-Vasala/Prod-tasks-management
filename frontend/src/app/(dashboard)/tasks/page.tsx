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
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let tasks;
  let pagination;

  if (!token) {
    redirect("/login");
  }

  const params = await searchParams;

  const filters = {
    status: params.status as TaskStatus | undefined,
    userId: params.userId ? Number(params.userId) : undefined,
    page: params.page ? Number(params.page) : undefined,
    limit: params.limit ? Number(params.limit) : undefined,
    sortBy: params.sortBy as TaskFilters["sortBy"],
    sortOrder: params.sortOrder as TaskFilters["sortOrder"],
  };

  try {
    const res = await getAllTasksService(token, filters);
    tasks = res.data;
    pagination = res.pagination;
  } catch (error) {
    console.log(error);
    redirect("/login");
  }

  return (
    <main className="lg:px-20 sm:px-10 pt-1 px-4 ">
      <TaskGrid initialTasks={tasks} pagination={pagination} />
    </main>
  );
}
