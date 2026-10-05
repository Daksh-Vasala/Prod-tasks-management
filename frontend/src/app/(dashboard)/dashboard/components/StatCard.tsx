import type { LucideIcon } from "lucide-react";

export type Tone = "default" | "pending" | "progress" | "done";

export interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  tone?: Tone;
}

const tones: Record<
  Tone,
  { card: string; icon: string; value: string; label: string }
> = {
  default: {
    card: "border-zinc-200 bg-white",
    icon: "bg-zinc-100 text-zinc-700",
    value: "text-zinc-900",
    label: "text-zinc-500",
  },
  pending: {
    card: "border-zinc-200 bg-zinc-50",
    icon: "bg-zinc-200 text-zinc-600",
    value: "text-zinc-800",
    label: "text-zinc-500",
  },
  progress: {
    card: "border-amber-200 bg-amber-50",
    icon: "bg-amber-100 text-amber-700",
    value: "text-amber-900",
    label: "text-amber-700",
  },
  done: {
    card: "border-emerald-200 bg-emerald-50",
    icon: "bg-emerald-100 text-emerald-700",
    value: "text-emerald-900",
    label: "text-emerald-700",
  },
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  tone = "default",
}: StatCardProps) {
  const t = tones[tone];

  return (
    <div
      className={`flex flex-col justify-between rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md sm:justify-center sm:gap-3 lg:flex-row lg:items-center lg:justify-start lg:gap-3 lg:p-3 ${t.card}`}
    >
      <div className={`w-fit shrink-0 rounded-lg p-2 ${t.icon}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className={`text-2xl font-semibold ${t.value}`}>{value}</p>
        <p className={`text-xs font-medium ${t.label}`}>{title}</p>
      </div>
    </div>
  );
}