import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@ui/header";
import { Separator } from "@ui/separator";
import { OverviewStatsCards } from "@features/stats/overview-stats";
import { LinkClickRanking } from "@features/stats/link-click-ranking";
import { useMessages } from "@core/i18n";

export const Route = createFileRoute("/app/linktree/stats")({
  component: StatsPage,
});

function StatsPage() {
  const messages = useMessages();
  return (
    <div className="flex flex-col gap-6">
      <Header title={messages.dashboard.stats} />

      <OverviewStatsCards />

      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
        <div className="px-5 py-4">
          <p className="text-sm font-semibold text-zinc-700">Cliques por link</p>
          <p className="mt-0.5 text-xs text-zinc-400">
            Performance dos seus links nos últimos 30 dias.
          </p>
        </div>
        <Separator />
        <div className="p-5">
          <LinkClickRanking />
        </div>
      </div>
    </div>
  );
}
