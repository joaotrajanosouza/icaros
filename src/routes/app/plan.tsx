import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@ui/header";
import { PlanCard } from "@features/plan/plan-card";
import { GlobalPageLayout } from "@layouts/global-page-layout";
import { useMessages } from "@core/i18n";

export const Route = createFileRoute("/app/plan")({
  component: PlanPage,
});

function PlanPage() {
  const messages = useMessages();
  return (
    <GlobalPageLayout>
      <div className="flex flex-col gap-6">
        <Header title={messages.dashboard.plan} />
        <PlanCard />
      </div>
    </GlobalPageLayout>
  );
}
