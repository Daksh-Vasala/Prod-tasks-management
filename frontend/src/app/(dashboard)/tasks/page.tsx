"use client";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import TaskHeader from "./components/TaskHeader";
import TaskCard from "./components/TaskCard";
import { getAllTasksService } from "@/features/tasks/services/tasks.service";
import { useEffect, useState } from "react";
import { Task } from "@/features/tasks/types/tasks.types";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const getTasks = async () => {
    try {
      const res = await getAllTasksService();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <main className="lg:px-20 sm:px-10 pt-1 px-4 ">
      <TaskHeader taskLength={tasks.length} />
      <ProtectedRoute>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </ProtectedRoute>
    </main>
  );
}
