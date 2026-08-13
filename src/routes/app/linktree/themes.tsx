import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { myPageQuery, subscriptionQuery } from "@core/queries";
import { Header } from "@ui/header";
import { Skeleton } from "@ui/loading";
import { ThemeGallery } from "@features/themes/theme-gallery";
import { useMessages } from "@core/i18n";

export const Route = createFileRoute("/app/linktree/themes")({
  component: ThemesPage,
});

function ThemesPage() {
  const messages = useMessages();
  const { data: page, isLoading } = useQuery(myPageQuery);
  const { data: subscription } = useQuery(subscriptionQuery);

  if (isLoading || !page) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Header title={messages.dashboard.themes} />
      <ThemeGallery currentThemeId={page.themeId} isPaidPlan={subscription?.planId === "paid"} />
    </div>
  );
}
