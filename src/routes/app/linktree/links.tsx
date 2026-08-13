import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@ui/header";
import { LinkList } from "@features/page-editor/link-list";
import { useMessages } from "@core/i18n";

export const Route = createFileRoute("/app/linktree/links")({
  component: LinksPage,
});

function LinksPage() {
  const messages = useMessages();
  return (
    <div className="flex flex-col gap-6">
      <Header title={messages.dashboard.links} />
      <LinkList />
    </div>
  );
}
