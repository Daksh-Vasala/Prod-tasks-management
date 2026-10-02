"use client";
import { Task, TaskStatus } from "@/features/tasks/types/tasks.types";
import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskViewModal from "./TaskViewModal";
import {
  createTaskService,
  deleteTaskService,
  updateTaskService,
} from "@/features/tasks/services/tasks.service";
import { toast } from "sonner";
import TaskFormModal from "./TaskFormModal";
import ConfirmationModal from "@/components/ConfirmationModal";

interface TaskInput {
  title: string;
  description?: string;
  status: TaskStatus;
}

type ConfirmationConfig = {
  title: string;
  message: string;
  confirmText: string;
  onConfirm: () => void | Promise<void>;
};

function TaskGrid({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [confirmationConfig, setConfirmationConfig] =
    useState<ConfirmationConfig>();

  const onView = (task: Task) => {
    setSelectedTask(task);
    setIsOpenViewModal(true);
  };

  const onEdit = (task: Task) => {
    setSelectedTask(task);
    setIsEditing(true);
    setIsOpenAddModal(true);
  };

  const onClose = () => {
    setIsOpenAddModal(false);
    setIsEditing(false);
    setSelectedTask(null);
  };

  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
    setConfirmationConfig({
      title: "Delete task",
      message: "Are you sure you want to delete this task?",
      confirmText: "Delete",
      onConfirm: () => onDelete(task.id),
    });
    setConfirmation(true);
  };

  const onDelete = async (taskId: number) => {
    setIsLoading(true);
    try {
      const res = await deleteTaskService(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      toast.success(res.message || "Task deleted");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onStatusChange = async (status: TaskStatus, task: Task) => {
    setIsLoading(true);
    try {
      const res = await updateTaskService(task.id, {
        title: task.title,
        description: task.description,
        status,
      });
      setTasks((prev) =>
        prev.map((current) => (current.id === task.id ? res.data : current)),
      );
      toast.success(res.message || "Task updated");
    } catch (error) {
      console.log("Error updating task status: ", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (status: TaskStatus, task: Task) => {
    setConfirmationConfig({
      title: "Change status",
      message: "Are you sure you want to change this task's status?",
      confirmText: "Change",
      onConfirm: () => onStatusChange(status, task),
    });
    setConfirmation(true);
  };

  const onSubmit = async (data: TaskInput) => {
    setIsLoading(true);

    try {
      if (!isEditing) {
        const res = await createTaskService(data);
        setTasks((prev) => [...prev, res.data]);
        toast.success(res.message || "Task created");
      } else {
        if (!selectedTask) {
          toast.error("No task selected");
          return;
        }
        const taskId = selectedTask.id;
        const res = await updateTaskService(taskId, data);

        setTasks((prev) => prev.map((t) => (t.id === taskId ? res.data : t)));
        toast.success(res.message || "Task updated");
      }
      onClose();
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
              onClick={() => {
                setIsEditing(false);
                setIsOpenAddModal(true);
              }}
              className="bg-blue-500 rounded-full text-white px-2 py-1 cursor-pointer text-sm pl-3"
            >
              + New task
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onView={onView}
            onDelete={handleDeleteClick}
            onStatusChange={handleStatusChange}
          />
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
      <TaskFormModal
        isOpen={isOpenAddModal}
        onClose={onClose}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isEditing={isEditing}
        selectedTask={selectedTask}
      />
      <ConfirmationModal
        isOpen={confirmation}
        title={confirmationConfig?.title ?? ""}
        message={confirmationConfig?.message ?? ""}
        confirmText={confirmationConfig?.confirmText ?? "Confirm"}
        isLoading={isLoading}
        onConfirm={async () => {
          if (!confirmationConfig) return;

          await confirmationConfig.onConfirm();
          setConfirmation(false);
        }}
        onCancel={() => setConfirmation(false)}
      />
    </>
  );
}

export default TaskGrid;
