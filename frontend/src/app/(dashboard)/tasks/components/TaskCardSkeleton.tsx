function TaskCardSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-zinc-100 shadow-md animate-pulse">
      <div className="h-1 bg-zinc-300" />

      <div className="p-4">
        <div className="flex justify-between">
          <div className="h-7 w-20 rounded-full bg-zinc-300" />

          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-md bg-zinc-300" />
            <div className="h-8 w-8 rounded-md bg-zinc-300" />
          </div>
        </div>

        <div className="mt-2 border-b border-zinc-300 p-2">
          <div className="h-6 w-3/4 rounded bg-zinc-300" />

          <div className="mt-3 space-y-2">
            <div className="h-4 w-full rounded bg-zinc-300" />
            <div className="h-4 w-2/3 rounded bg-zinc-300" />
          </div>
        </div>

        <div className="flex justify-between px-2 pt-3">
          <div className="h-3 w-24 rounded bg-zinc-300" />
          <div className="h-3 w-24 rounded bg-zinc-300" />
        </div>
      </div>
    </div>
  );
}

export default TaskCardSkeleton;