import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Copy, ExternalLink, Sparkles } from "lucide-react";
import { myPageQuery, subscriptionQuery } from "@core/queries";
import { Header } from "@ui/header";
import { Button } from "@ui/button";
import { Badge } from "@ui/badge";
import { Skeleton } from "@ui/loading";
import { OverviewStatsCards } from "@features/stats/overview-stats";
import { publicPageUrl, copyToClipboard } from "@core/utils";
import { toast } from "@ui/toaster";
import { useMessages } from "@core/i18n";

export const Route = createFileRoute("/app/linktree/")({
  component: OverviewPage,
});

function OverviewPage() {
  const messages = useMessages();
  const { data: page, isLoading } = useQuery(myPageQuery);
  const { data: subscription } = useQuery(subscriptionQuery);

  if (isLoading || !page) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-28" />
        <Skeleton className="h-24" />
      </div>
    );
  }

  const pageUrl = publicPageUrl(page.username);
  const isPaid = subscription?.planId === "paid";

  return (
    <div className="flex flex-col gap-6">
      <Header title={messages.dashboard.overview} />

      <div className="rounded-3xl border border-zinc-200 bg-white p-5">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
          Sua página pública
        </p>
        <p className="mb-4 truncate text-lg font-bold text-violet-600">{pageUrl}</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={async () => {
              const ok = await copyToClipboard(pageUrl);
              toast(ok ? messages.common.copied : "Não foi possível copiar.", ok ? "success" : "error");
            }}
          >
            <Copy size={14} />
            {messages.common.copy}
          </Button>
          <a href={`/${page.username}`} target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm">
              <ExternalLink size={14} />
              {messages.dashboard.viewPage}
            </Button>
          </a>
        </div>
      </div>

      <OverviewStatsCards />

      <div className="flex items-center justify-between rounded-3xl border border-zinc-200 bg-white p-4">
        <span className="text-sm text-zinc-600">Plano atual</span>
        <Badge tone={isPaid ? "violet" : "neutral"}>{isPaid ? "Pago" : "Grátis"}</Badge>
      </div>

      {!isPaid ? (
        <Link
          to="/app/plan"
          className="flex items-center gap-3 rounded-3xl border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-700"
        >
          <Sparkles size={18} />
          {messages.dashboard.upgradeSuggestion}
        </Link>
      ) : null}
    </div>
  );
}
