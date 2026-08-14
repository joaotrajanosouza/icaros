import { Eye, MousePointerClick } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { overviewStatsQuery } from "@core/queries";
import { Skeleton } from "@ui/loading";
import { formatCompactNumber } from "@core/utils";
import { useMessages } from "@core/i18n";

export function OverviewStatsCards() {
  const messages = useMessages();
  const { data, isLoading } = useQuery(overviewStatsQuery);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard
        icon={Eye}
        value={formatCompactNumber(data?.totalViews ?? 0)}
        label={messages.dashboard.totalViews}
        accent="violet"
      />
      <StatCard
        icon={MousePointerClick}
        value={formatCompactNumber(data?.totalClicks ?? 0)}
        label={messages.dashboard.totalClicks}
        accent="emerald"
      />
    </div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  accent,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  accent: "violet" | "emerald";
}) {
  const colors = {
    violet: "bg-violet-50 text-violet-600",
    emerald: "bg-emerald-50 text-emerald-600",
  } as const;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <span
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${colors[accent]}`}
      >
        <Icon size={18} />
      </span>
      <p className="text-2xl font-bold tracking-tight text-zinc-900">{value}</p>
      <p className="mt-0.5 text-xs text-zinc-400">{label}</p>
    </div>
  );
}
