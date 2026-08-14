import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutGrid,
  User,
  Link2,
  FolderOpen,
  Palette,
  BarChart3,
} from "lucide-react";
import { cx } from "@ui/variants";

const MOBILE_NAV_ITEMS = [
  { to: "/app/linktree", label: "Visão geral", icon: LayoutGrid, exact: true },
  { to: "/app/linktree/page", label: "Página", icon: User, exact: false },
  { to: "/app/linktree/links", label: "Links", icon: Link2, exact: false },
  { to: "/app/linktree/folder", label: "Pasta", icon: FolderOpen, exact: false },
  { to: "/app/linktree/themes", label: "Temas", icon: Palette, exact: false },
  { to: "/app/linktree/stats", label: "Stats", icon: BarChart3, exact: false },
] as const;

type MobileNavItem = (typeof MOBILE_NAV_ITEMS)[number];

function isActive(item: MobileNavItem, pathname: string) {
  return item.exact
    ? pathname === item.to
    : pathname === item.to || pathname.startsWith(item.to + "/");
}

export function MainLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 px-4 pb-24 pt-6 md:px-8 md:pb-8">
        <div className="mx-auto w-full max-w-3xl">{children}</div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-border bg-background/95 backdrop-blur md:hidden">
        {MOBILE_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item, pathname);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cx(
                "relative flex flex-1 flex-col items-center gap-1 px-1 pb-2 pt-3 text-[10px] font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              {active ? (
                <span className="absolute inset-x-2 top-0 h-0.5 rounded-full bg-primary" />
              ) : null}
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
