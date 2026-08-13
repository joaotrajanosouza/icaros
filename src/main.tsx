import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { queryClient } from "@/query-client";
import { AuthProvider } from "@core/auth-provider";
import { useAuth } from "@core/auth-context";
import { routeTree } from "./routeTree.gen";
import "./index.css";

const router = createRouter({ routeTree, context: { queryClient } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

async function bootstrap() {
  if (import.meta.env.DEV) {
    const { worker } = await import("@mocks/browser");
    await worker.start({ onUnhandledRequest: "bypass" });
  }

  const rootElement = document.getElementById("root")!;
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <InnerApp />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}

void bootstrap();
