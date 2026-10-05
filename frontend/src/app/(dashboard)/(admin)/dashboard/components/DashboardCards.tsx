import {
  Users,
  UserCheck,
  ListTodo,
  Clock,
  Loader,
  CheckCircle2,
} from "lucide-react";
import { DashboardStats } from "@/features/dashboard/types/dashboard.type";
import StatCard, { type StatCardProps } from "./StatCard";

interface DashboardCardsProps {
  stats: DashboardStats;
}

const gridClass =
  "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:max-w-6xl";

export default function DashboardCards({ stats }: DashboardCardsProps) {
  const overview: StatCardProps[] = [
    { title: "Total Users", value: stats.totalUsers, icon: Users },
    { title: "Active Users", value: stats.activeUsers, icon: UserCheck },
    { title: "Total Tasks", value: stats.totalTasks, icon: ListTodo },
  ];

  const taskStatus: StatCardProps[] = [
    { title: "Pending", value: stats.pendingTasks, icon: Clock, tone: "pending" },
    { title: "In Progress", value: stats.inProgressTasks, icon: Loader, tone: "progress" },
    { title: "Completed", value: stats.completedTasks, icon: CheckCircle2, tone: "done" },
  ];

  return (
    <div className="space-y-6">
      <div className={gridClass}>
        {overview.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-900 sm:text-base">
          Task Status
        </h2>
        <div className={gridClass}>
          {taskStatus.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>
      </section>
    </div>
  );
}