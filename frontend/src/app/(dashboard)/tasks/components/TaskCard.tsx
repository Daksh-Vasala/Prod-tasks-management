import { Task } from "@/features/tasks/types/tasks.types";
import { Edit, Trash2 } from "lucide-react";

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="rounded-xl w-full bg-zinc-100 shadow-md overflow-hidden">
      <div className="bg-amber-200 h-1"></div>
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between">
          <div className="bg-amber-200 rounded-full text-amber-900 cursor-pointer font-semibold px-2 h-7 flex justify-center items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-amber-800"></div>
            <span className="text-[11px]">In progress</span>
          </div>
          <div className="flex gap-2">
            <button
              aria-label="Edit task"
              className="rounded-md p-2 cursor-pointer text-blue-500 transition hover:bg-blue-100"
            >
              <Edit size={16} />
            </button>
            <button
              aria-label="Delete task"
              className="rounded-md p-2 cursor-pointer text-red-500 transition hover:bg-red-100"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Main */}
        <div className="mt-2 p-2 border-b border-zinc-300">
          <h3 className="text-lg font-semibold text-zinc-900">{task.title}</h3>
          <p className="mt-2 cursor-pointer line-clamp-2 text-sm text-gray-600">
            {task?.description}
          </p>
        </div>

        <div className="flex justify-between px-2 pt-3 text-xs text-zinc-500">
          <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
          <span>Updated {new Date(task.updatedAt).toLocaleDateString()}6</span>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
