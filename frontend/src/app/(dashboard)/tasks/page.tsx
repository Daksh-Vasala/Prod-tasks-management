import { getAllTasksService } from "@/features/tasks/services/tasks.service";
import TaskGrid from "./components/TaskGrid";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function TasksPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let tasks;
  if (!token) {
    redirect("/login");
  }
  try {
    const res = await getAllTasksService(token);
    tasks = res.data;
  } catch (error) {
    redirect("/login");
  }

  return (
    <main className="lg:px-20 sm:px-10 pt-1 px-4 ">
      <TaskGrid initialTasks={tasks} />
    </main>
  );
}
