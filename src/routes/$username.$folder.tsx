import { createFileRoute } from "@tanstack/react-router";
import { PublicPageView } from "@features/public-page/public-page-view";

export const Route = createFileRoute("/$username/$folder")({
  component: PublicFolderPage,
});

function PublicFolderPage() {
  const { username, folder } = Route.useParams();
  return <PublicPageView username={username} folderSlug={folder} />;
}
