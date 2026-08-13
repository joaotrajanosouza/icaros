import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { myPageQuery, foldersQuery, subscriptionQuery } from "@core/queries";
import { PLAN_LIMITS } from "@core/constants";
import { Header } from "@ui/header";
import { Skeleton } from "@ui/loading";
import { FolderPanel } from "@features/folder/folder-panel";
import { useMessages } from "@core/i18n";

export const Route = createFileRoute("/app/linktree/folder")({
  component: FolderPage,
});

function FolderPage() {
  const messages = useMessages();
  const { data: page, isLoading: pageLoading } = useQuery(myPageQuery);
  const { data: folders, isLoading: foldersLoading } = useQuery(foldersQuery);
  const { data: subscription } = useQuery(subscriptionQuery);

  if (pageLoading || foldersLoading || !page) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  const planId = subscription?.planId ?? "free";
  const limit = PLAN_LIMITS[planId].maxFolders;
  const canCreateFolder = (folders?.length ?? 0) < limit;

  return (
    <div className="flex flex-col gap-6">
      <Header title={messages.dashboard.folder} />
      <FolderPanel username={page.username} canCreateFolder={canCreateFolder} />
    </div>
  );
}
