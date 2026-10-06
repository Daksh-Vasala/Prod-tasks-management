const rowCount = 5;

function SkeletonBar({ className }: { className: string }) {
  return <div className={`rounded bg-zinc-200 ${className}`} />;
}

function DesktopRows() {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-200/80 bg-zinc-50/80">
            {["User", "Email", "Phone", "Role", "Status", "Actions"].map(
              (heading) => (
                <th key={heading} scope="col" className="px-6 py-3.5">
                  <span className="sr-only">{heading}</span>
                  <SkeletonBar className="h-3 w-12 bg-zinc-300" />
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200/60">
          {Array.from({ length: rowCount }).map((_, index) => (
            <tr key={index}>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <SkeletonBar className="h-10 w-10 shrink-0 rounded-full" />
                  <div className="space-y-2">
                    <SkeletonBar className="h-4 w-28" />
                    <SkeletonBar className="h-3 w-20 bg-zinc-100" />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <SkeletonBar className="h-4 w-36" />
              </td>
              <td className="px-6 py-4">
                <SkeletonBar className="h-4 w-24" />
              </td>
              <td className="px-6 py-4">
                <SkeletonBar className="h-6 w-20" />
              </td>
              <td className="px-6 py-4">
                <SkeletonBar className="h-6 w-16 rounded-full" />
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <SkeletonBar className="h-8 w-8 rounded-lg" />
                  <SkeletonBar className="h-8 w-8 rounded-lg" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MobileCards() {
  return (
    <div className="divide-y divide-zinc-200/60 md:hidden">
      {Array.from({ length: rowCount }).map((_, index) => (
        <div key={index} className="space-y-3.5 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <SkeletonBar className="h-11 w-11 shrink-0 rounded-full" />
              <div className="space-y-2">
                <SkeletonBar className="h-4 w-32" />
                <SkeletonBar className="h-3 w-20 bg-zinc-100" />
              </div>
            </div>
            <SkeletonBar className="h-6 w-16 rounded-full" />
          </div>
          <div className="space-y-2 rounded-lg bg-zinc-50/80 p-3">
            <SkeletonBar className="h-4 w-4/5" />
            <SkeletonBar className="h-4 w-2/5" />
          </div>
          <div className="flex items-center justify-between">
            <SkeletonBar className="h-6 w-20" />
            <div className="flex gap-2">
              <SkeletonBar className="h-8 w-8 rounded-lg" />
              <SkeletonBar className="h-8 w-8 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Loading() {
  return (
    <main className="p-4" role="status" aria-label="Loading users">
      <span className="sr-only">Loading users...</span>
      <div
        aria-hidden="true"
        className="animate-pulse overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm"
      >
        <DesktopRows />
        <MobileCards />
      </div>
    </main>
  );
}