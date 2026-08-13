import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@ui/header";
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
      <div className="rounded-3xl border border-zinc-200 bg-white p-5">
        <p className="mb-4 text-sm font-semibold text-zinc-700">Cliques por link</p>
        <LinkClickRanking />
      </div>
    </div>
  );
}
