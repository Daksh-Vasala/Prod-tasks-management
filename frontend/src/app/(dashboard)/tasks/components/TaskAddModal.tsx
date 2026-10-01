"use client";
import {
  Task,
  TaskInput,
  TaskStatus,
} from "@/features/tasks/types/tasks.types";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface TaskAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskInput) => void;
  isLoading: boolean;
}

function TaskAddModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: TaskAddModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.PENDING);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>();

  const validate = () => {
    const newErrors: {
      title?: string;
      description?: string;
    } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (title.trim().length > 100) {
      newErrors.title = "Title must be 100 characters or less";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      status,
    });
  };

  const resetForm = () => {
    setErrors({});
    setTitle("");
    setDescription("");
    setStatus(TaskStatus.PENDING);
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
            <h2 className="mt-1 text-xl font-semibold text-zinc-900">
              Add task
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              resetForm();
            }}
            aria-label="Close task details"
            className="rounded-md p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            <X size={18} />
          </button>
        </div>

        <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-zinc-700 font-medium">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={title}
              type="text"
              disabled={isLoading}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors?.title) {
                  setErrors((prev) => ({
                    ...prev,
                    title: undefined,
                  }));
                }
              }}
              className="border border-zinc-400 px-2 py-1 outline-none focus:ring-1 focus:ring-gray-400 transition-all mt-2 rounded-lg"
            />
            {errors?.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-zinc-700 font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              disabled={isLoading}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors?.description) {
                  setErrors((prev) => ({
                    ...prev,
                    description: undefined,
                  }));
                }
              }}
              className="border border-zinc-400 px-2 py-1 outline-none focus:ring-1 focus:ring-gray-400 transition-all mt-2 rounded-lg"
            />
            {errors?.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="status" className="text-zinc-700 font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="w-full mt-2 appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 shadow-sm outline-none transition-all focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              value={status}
              disabled={isLoading}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
              <option value={TaskStatus.PENDING}>Pending</option>
              <option value={TaskStatus.INPROGRESS}>In progress</option>
              <option value={TaskStatus.COMPLETED}>Completed</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                resetForm();
              }}
              disabled={isLoading}
              className="rounded-xl border border-zinc-400 px-4 py-2.5 text-sm font-semibold text-zinc-600 transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-900 active:scale-98 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className={`rounded-xl bg-indigo-600 ${isLoading && "opacity-50"} px-5 py-2.5 text-sm font-semibold text-white shadow-indigo-500/10 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/20 active:scale-98 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskAddModal;
