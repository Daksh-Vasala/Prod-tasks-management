"use client";
import { Task } from "@/features/tasks/types/tasks.types";
import { X } from "lucide-react";

interface TaskViewModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

function TaskViewModal({
  task,
  isOpen,
  onClose,
}: TaskViewModalProps) {
  if (!isOpen || !task) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-zinc-200 pb-4">
          <div>
            <p className="text-sm text-zinc-500">Task details</p>
            <h2 className="mt-1 text-xl font-semibold text-zinc-900">
              {task.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close task details"
            className="rounded-md p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          <div>
            <p className="text-sm font-medium text-zinc-500">Description</p>
            <p className="mt-1 text-sm leading-6 text-zinc-800">
              {task.description || "No description provided."}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-500">Status</p>
            <p className="mt-1 text-sm font-medium capitalize text-zinc-900">
              {task.status}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-zinc-200 pt-4">
            <div>
              <p className="text-xs text-zinc-500">Created</p>
              <p className="mt-1 text-sm text-zinc-800">
                {task.createdAt.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">Updated</p>
              <p className="mt-1 text-sm text-zinc-800">
                {task.updatedAt.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskViewModal;