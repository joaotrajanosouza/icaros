import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { queryClient } from "@/query-client";
import { currentUserQuery } from "@core/queries";
import { AppShellLayout } from "@layouts/app-shell-layout";

export const Route = createFileRoute("/app")({
  beforeLoad: async () => {
    const user = await queryClient.ensureQueryData(currentUserQuery);
    if (!user) throw redirect({ to: "/login" });
  },
  component: () => (
    <AppShellLayout>
      <Outlet />
    </AppShellLayout>
  ),
});
