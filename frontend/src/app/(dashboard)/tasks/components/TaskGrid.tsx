"use client";
import { Task, TaskStatus } from "@/features/tasks/types/tasks.types";
import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskViewModal from "./TaskViewModal";
import TaskAddModal from "./TaskAddModal";
import { createTaskService } from "@/features/tasks/services/tasks.service";
import { toast } from "sonner";

interface TaskInput {
  title: string;
  description?: string;
  status: TaskStatus;
}

function TaskGrid({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isOpenAddModal, setIsOpenAddModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onView = (task: Task) => {
    setSelectedTask(task);
    setIsOpenViewModal(true);
  };

  const onSubmit = async (data: TaskInput) => {
    setIsLoading(true);
    try {
      const res = await createTaskService(data);
      setTasks((prev) => [...prev, res.data]);
      toast.success(res.message || "Task created");
      setIsOpenAddModal(false);
    } catch (error) {
      console.log("Error in adding task: ", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="pt-6">
        {/* Header */}
        <div className="flex justify-between">
          <p className="text-3xl font-semibold">Tasks</p>

          <div className="flex gap-2 sm:gap-4 justify-center items-center">
            <span className="border rounded-full border-zinc-600 text-[12px] font-semibold px-2 py-1">
              {tasks.length > 0
                ? `${tasks.length} task${tasks.length > 1 ? "s" : ""}`
                : "No tasks"}
            </span>
            <button
              onClick={() => setIsOpenAddModal(true)}
              className="bg-blue-500 rounded-full text-white px-2 py-1 cursor-pointer text-sm pl-3"
            >
              + New task
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onView={onView} />
        ))}
      </div>
      <TaskViewModal
        isOpen={isOpenViewModal}
        task={selectedTask}
        onClose={() => {
          setIsOpenViewModal(false);
          setSelectedTask(null);
        }}
      />
      <TaskAddModal
        isOpen={isOpenAddModal}
        onClose={() => setIsOpenAddModal(false)}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </>
  );
}

export default TaskGrid;
