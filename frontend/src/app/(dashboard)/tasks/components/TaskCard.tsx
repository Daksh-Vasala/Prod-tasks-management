"use client";
import { Task, TaskStatus } from "@/features/tasks/types/tasks.types";
import { Edit, Trash2 } from "lucide-react";

function TaskCard({
  task,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  task: Task;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (status: TaskStatus, task: Task) => void;
}) {
  const statusStyles = {
    [TaskStatus.PENDING]: {
      label: "Pending",
      badge: "bg-zinc-200 text-zinc-900",
      header: "bg-zinc-200",
      pulse: "bg-zinc-900",
    },
    [TaskStatus.INPROGRESS]: {
      label: "In progress",
      badge: "bg-amber-200 text-amber-900",
      header: "bg-amber-200",
      pulse: "bg-amber-900",
    },
    [TaskStatus.COMPLETED]: {
      label: "Completed",
      badge: "bg-green-200 text-green-900",
      header: "bg-green-200",
      pulse: "bg-green-900",
    },
  };
  const statusStyle = statusStyles[task.status];

  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-zinc-100 shadow-md overflow-hidden">
      <div className={`${statusStyle.header} h-1`}></div>
      <div className="flex flex-1 flex-col p-4">
        {/* Header */}
        <div className="flex justify-between">
          <select
            value={task.status}
            onChange={(e) => {
              const newStatus = e.target.value as TaskStatus;

              if (newStatus === task.status) return;

              onStatusChange(newStatus, task);
            }}
            className={`${statusStyle.badge} rounded-full cursor-pointer border-0 outline-none px-2 h-7 text-[11px] font-semibold`}
          >
            <option value={TaskStatus.PENDING}>Pending</option>
            <option value={TaskStatus.INPROGRESS}>In progress</option>
            <option value={TaskStatus.COMPLETED}>Completed</option>
          </select>
          <div className="flex gap-2">
            <button
              aria-label="Edit task"
              onClick={() => onEdit(task)}
              className="rounded-md p-2 cursor-pointer text-blue-500 transition hover:bg-blue-100"
            >
              <Edit size={16} />
            </button>
            <button
              aria-label="Delete task"
              onClick={() => onDelete(task)}
              className="rounded-md p-2 cursor-pointer text-red-500 transition hover:bg-red-100"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Main */}
        <div className="mt-2 flex-1 border-b border-zinc-300 p-2">
          <h3 className="text-lg font-semibold text-zinc-900">{task.title}</h3>
          <p
            onClick={() => onView(task)}
            className="mt-2 cursor-pointer line-clamp-2 text-sm text-gray-600"
          >
            {task?.description}
          </p>
        </div>

        <div className="mt-auto flex justify-between px-2 pt-3 text-xs text-zinc-500">
          <span>Created {task.createdAt.toLocaleString()}</span>
          <span>Updated {task.updatedAt.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
