
const gridClass =
  "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:max-w-6xl";

function SkeletonCard() {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:justify-center sm:gap-3 lg:flex-row lg:items-center lg:justify-start lg:gap-3 lg:p-3">
      <div className="h-9 w-9 shrink-0 rounded-lg bg-zinc-200" />
      <div className="space-y-2">
        <div className="h-6 w-12 rounded bg-zinc-200" />
        <div className="h-3 w-20 rounded bg-zinc-100" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className={gridClass}>
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      <section className="space-y-3">
        <div className="h-4 w-24 rounded bg-zinc-200" />
        <div className={gridClass}>
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}