import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Copy, ExternalLink, Sparkles } from "lucide-react";
import { myPageQuery, subscriptionQuery } from "@core/queries";
import { Header } from "@ui/header";
import { Button } from "@ui/button";
import { Badge } from "@ui/badge";
import { Separator } from "@ui/separator";
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
        <Skeleton className="h-32" />
        <Skeleton className="h-24" />
        <Skeleton className="h-16" />
      </div>
    );
  }

  const pageUrl = publicPageUrl(page.username);
  const isPaid = subscription?.planId === "paid";

  return (
    <div className="flex flex-col gap-6">
      <Header title={messages.dashboard.overview} />

      {/* Public page card */}
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
        <div className="p-5">
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
                toast(
                  ok ? messages.common.copied : "Não foi possível copiar.",
                  ok ? "success" : "error",
                );
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

        <Separator />

        {/* Plan status strip */}
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-sm text-zinc-500">Plano atual</span>
          <Badge tone={isPaid ? "violet" : "neutral"}>
            {isPaid ? "Pago" : "Grátis"}
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <OverviewStatsCards />

      {/* Upgrade CTA — only for free plan */}
      {!isPaid ? (
        <Link
          to="/app/conta"
          className="flex items-center gap-3 rounded-3xl border border-violet-200 bg-gradient-to-r from-violet-50 to-white p-4 text-sm font-medium text-violet-700 transition-colors hover:border-violet-300 hover:bg-violet-50"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white shadow-sm shadow-violet-600/30">
            <Sparkles size={16} />
          </span>
          <div>
            <p className="font-semibold">{messages.dashboard.upgradeSuggestion}</p>
            <p className="text-xs text-violet-500">Links ilimitados, temas premium e mais.</p>
          </div>
        </Link>
      ) : null}
    </div>
  );
}
