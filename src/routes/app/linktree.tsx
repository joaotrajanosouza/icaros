import { createFileRoute, isRedirect, Outlet, redirect } from "@tanstack/react-router";
import { queryClient } from "@/query-client";
import { myPageQuery } from "@core/queries";
import { MainLayout } from "@layouts/main-layout";

export const Route = createFileRoute("/app/linktree")({
  beforeLoad: async () => {
    // Se o usuário ainda não configurou sua página (onboarding incompleto),
    // redireciona para o onboarding antes de renderizar qualquer rota filha.
    try {
      const page = await queryClient.ensureQueryData(myPageQuery);
      if (!page) throw redirect({ to: "/onboarding" });
    } catch (err) {
      if (isRedirect(err)) throw err; // re-propaga redirects do Router
      // Erro de fetch (ex.: 404 — usuário sem página) → onboarding
      throw redirect({ to: "/onboarding" });
    }
  },
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
});
