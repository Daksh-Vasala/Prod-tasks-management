"use client";
export default function TaskHeader({ taskLength }: { taskLength: number }) {
  return (
    <div className="pt-6">
      {/* Header */}
      <div className="flex justify-between">
        <p className="text-3xl font-semibold">Tasks</p>

        <div className="flex gap-2 sm:gap-4 justify-center items-center">
          <span className="border rounded-full border-zinc-600 text-[12px] font-semibold px-2 py-1">
            {taskLength > 0 ? `${taskLength} task ${taskLength > 1 ? "s": ""}` : "No tasks"}
          </span>
          <button className="bg-blue-500 rounded-full text-white px-2 py-1 cursor-pointer text-sm pl-3">
            + New task
          </button>
        </div>
      </div>
    </div>
  );
}
