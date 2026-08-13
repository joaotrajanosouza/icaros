import { createFileRoute, redirect } from "@tanstack/react-router";
import { queryClient } from "@/query-client";
import { currentUserQuery } from "@core/queries";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const user = await queryClient.ensureQueryData(currentUserQuery);
    throw redirect({ to: user ? "/app/linktree" : "/login" });
  },
});
