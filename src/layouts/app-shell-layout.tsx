import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AppSidebar } from "@ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "@ui/sidebar";

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

type Crumb = { href: string; label: string };

const ROUTE_LABELS: Record<string, { label: string; parent?: string }> = {
  "/app/linktree":          { label: "Link Tree" },
  "/app/linktree/page":     { label: "Minha página",    parent: "/app/linktree" },
  "/app/linktree/links":    { label: "Botões/links",    parent: "/app/linktree" },
  "/app/linktree/folder":   { label: "Subpasta",        parent: "/app/linktree" },
  "/app/linktree/themes":   { label: "Temas",           parent: "/app/linktree" },
  "/app/linktree/stats":    { label: "Estatísticas",    parent: "/app/linktree" },
  "/app/linktree/settings": { label: "Configurações",   parent: "/app/linktree" },
  "/app/plan":              { label: "Plano" },
};

function buildCrumbs(pathname: string): Crumb[] {
  const entry = ROUTE_LABELS[pathname];
  if (!entry) return [];
  const crumbs: Crumb[] = [];
  if (entry.parent) {
    const parentEntry = ROUTE_LABELS[entry.parent];
    if (parentEntry) crumbs.push({ href: entry.parent, label: parentEntry.label });
  }
  crumbs.push({ href: pathname, label: entry.label });
  return crumbs;
}

function AppBreadcrumb() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const crumbs = buildCrumbs(pathname);

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-1 text-sm">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <React.Fragment key={crumb.href}>
              {index > 0 && (
                <li aria-hidden className="select-none text-muted-foreground/50">
                  ›
                </li>
              )}
              <li>
                {isLast ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

// ─── AppShellLayout ───────────────────────────────────────────────────────────

export function AppShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header fixo com breadcrumb — oculto em mobile */}
        <header className="sticky top-0 z-20 hidden h-12 items-center border-b border-border bg-background/95 px-5 backdrop-blur md:flex">
          <AppBreadcrumb />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
