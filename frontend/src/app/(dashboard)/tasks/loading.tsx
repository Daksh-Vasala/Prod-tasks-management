import TaskCardSkeleton from "./components/TaskCardSkeleton";

export default function Loading() {
  return (
    <main className="lg:px-20 sm:px-10 pt-1 px-4">
      <div className="mb-4">
        <div className="h-8 w-32 animate-pulse rounded bg-zinc-200" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <TaskCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}