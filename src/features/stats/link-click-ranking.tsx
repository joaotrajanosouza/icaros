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
    return <EmptyState icon={BarChart3} title="Ainda não temos cliques suficientes para mostrar um ranking." />;
  }

  const maxClicks = Math.max(...data.map((item) => item.clicks), 1);

  return (
    <ul className="flex flex-col gap-3">
      {data.map((item) => (
        <li key={item.linkId}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium text-zinc-700">{item.title}</span>
            <span className="text-zinc-400">{formatCompactNumber(item.clicks)}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
            <div
              className="h-full rounded-full bg-violet-500"
              style={{ width: `${(item.clicks / maxClicks) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
