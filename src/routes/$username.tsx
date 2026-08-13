import { createFileRoute } from "@tanstack/react-router";
import { PublicPageView } from "@features/public-page/public-page-view";

export const Route = createFileRoute("/$username")({
  component: PublicUserPage,
});

function PublicUserPage() {
  const { username } = Route.useParams();
  return <PublicPageView username={username} />;
}
