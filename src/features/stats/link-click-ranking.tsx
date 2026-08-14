import { useQuery } from "@tanstack/react-query";
import { BarChart3 } from "lucide-react";
import { linkClickStatsQuery } from "@core/queries";
import { Loading } from "@ui/loading";
import { EmptyState } from "@pattern/empty-state";
import { formatCompactNumber } from "@core/utils";

export function LinkClickRanking() {
  const { data, isLoading } = useQuery(linkClickStatsQuery);

  if (isLoading) return <Loading />;
  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon={BarChart3}
        title="Ainda não temos cliques suficientes para mostrar um ranking."
      />
    );
  }

  const maxClicks = Math.max(...data.map((item) => item.clicks), 1);

  return (
    <ul className="flex flex-col gap-4">
      {data.map((item, index) => {
        const pct = (item.clicks / maxClicks) * 100;
        return (
          <li key={item.linkId}>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[10px] font-bold text-zinc-500">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-zinc-700">
                {item.title}
              </span>
              <span className="tabular-nums text-sm font-semibold text-zinc-900">
                {formatCompactNumber(item.clicks)}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full bg-violet-500 transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
