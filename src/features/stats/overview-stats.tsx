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
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4">
        <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <Eye size={18} />
        </span>
        <p className="text-2xl font-bold text-zinc-900">{formatCompactNumber(data?.totalViews ?? 0)}</p>
        <p className="text-xs text-zinc-400">{messages.dashboard.totalViews}</p>
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-4">
        <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <MousePointerClick size={18} />
        </span>
        <p className="text-2xl font-bold text-zinc-900">{formatCompactNumber(data?.totalClicks ?? 0)}</p>
        <p className="text-xs text-zinc-400">{messages.dashboard.totalClicks}</p>
      </div>
    </div>
  );
}
