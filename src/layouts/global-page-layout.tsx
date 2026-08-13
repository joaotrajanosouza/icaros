import type { ReactNode } from "react";

/**
 * Layout de conteúdo para páginas globais do app shell (ex.: Plano).
 * Fornece o mesmo container responsivo do MainLayout, sem navegação de módulo.
 */
export function GlobalPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col bg-zinc-50">
      <main className="flex-1 px-4 pb-8 pt-6 md:px-8">
        <div className="mx-auto w-full max-w-3xl">{children}</div>
      </main>
    </div>
  );
}
