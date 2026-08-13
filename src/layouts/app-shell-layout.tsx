import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Link2, CreditCard } from "lucide-react";
import { cx } from "@ui/variants";
import { APP_NAME } from "@core/constants";

const MODULES = [
  { to: "/app/linktree", label: "Link Tree", icon: Link2 },
] as const;

const GLOBAL_ITEMS = [
  { to: "/app/plan", label: "Plano", icon: CreditCard },
] as const;

export function AppShellLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-dvh bg-zinc-50">
      {/* Sidebar de módulos — visível apenas em desktop */}
      <aside className="hidden w-16 shrink-0 flex-col items-center border-r border-zinc-100 bg-white py-4 md:flex">
        <p className="mb-6 text-lg font-black text-violet-600">
          {APP_NAME.slice(0, 1)}
        </p>
        <nav className="flex flex-1 flex-col items-center gap-2">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            const active = pathname.startsWith(mod.to);
            return (
              <Link
                key={mod.to}
                to={mod.to}
                className={cx(
                  "flex flex-col items-center gap-1 rounded-xl p-2 text-[10px] font-medium transition-colors w-12",
                  active
                    ? "bg-violet-50 text-violet-700"
                    : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700",
                )}
              >
                <Icon size={20} />
                {mod.label}
              </Link>
            );
          })}
        </nav>

        {/* Itens globais (plano, conta) — separados dos módulos */}
        <nav className="flex flex-col items-center gap-2 pb-2">
          {GLOBAL_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cx(
                  "flex flex-col items-center gap-1 rounded-xl p-2 text-[10px] font-medium transition-colors w-12",
                  active
                    ? "bg-violet-50 text-violet-700"
                    : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700",
                )}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Área de conteúdo */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
