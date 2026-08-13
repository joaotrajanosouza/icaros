import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutGrid,
  User,
  Link2,
  FolderOpen,
  Palette,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cx } from "@ui/variants";

const NAV_ITEMS = [
  { to: "/app/linktree", label: "Visão geral", icon: LayoutGrid, exact: true },
  { to: "/app/linktree/page", label: "Minha página", icon: User, exact: false },
  { to: "/app/linktree/links", label: "Botões/links", icon: Link2, exact: false },
  { to: "/app/linktree/folder", label: "Subpasta", icon: FolderOpen, exact: false },
  { to: "/app/linktree/themes", label: "Temas", icon: Palette, exact: false },
  { to: "/app/linktree/stats", label: "Estatísticas", icon: BarChart3, exact: false },
  { to: "/app/linktree/settings", label: "Configurações", icon: Settings, exact: false },
] as const;

const MOBILE_NAV_ITEMS = NAV_ITEMS.slice(0, 5);

export function MainLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex flex-1 bg-zinc-50">
      <aside
        className={cx(
          "hidden shrink-0 flex-col border-r border-zinc-100 bg-white px-3 py-6 transition-[width] duration-200 dark:border-zinc-800 dark:bg-zinc-900 md:flex",
          isCollapsed ? "w-16" : "w-56",
        )}
      >
        <div className={cx("mb-4 flex", isCollapsed ? "justify-center" : "justify-end")}>
          <button
            type="button"
            aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
            title={isCollapsed ? "Expandir menu" : "Recolher menu"}
            onClick={() => setIsCollapsed((collapsed) => !collapsed)}
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cx(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isCollapsed && "justify-center px-2",
                  active
                    ? "bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={18} />
                {!isCollapsed && item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 px-4 pb-24 pt-6 md:px-8 md:pb-8">
          <div className="mx-auto w-full max-w-3xl">{children}</div>
        </main>

        <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-zinc-100 bg-white/95 backdrop-blur md:hidden">
          {MOBILE_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cx(
                  "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
                  active ? "text-violet-600" : "text-zinc-400",
                )}
              >
                <Icon size={20} />
                {item.label.split(" ")[0]}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
