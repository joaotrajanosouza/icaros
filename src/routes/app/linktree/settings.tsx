import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut, Moon, User } from "lucide-react";
import { Header } from "@ui/header";
import { Button } from "@ui/button";
import { Separator } from "@ui/separator";
import { useAuth } from "@core/auth-context";
import { useMessages } from "@core/i18n";
import { useAppearance } from "@core/appearance-context";
import { Switch } from "@ui/switch";

export const Route = createFileRoute("/app/linktree/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const messages = useMessages();
  const { user, logout } = useAuth();
  const { isDark, toggleMode } = useAppearance();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <Header title={messages.dashboard.settings} />

      {/* Account + Appearance — grouped card */}
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
        {/* Account section */}
        <div className="flex items-center gap-3 p-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
            <User size={18} />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              Conta conectada
            </p>
            <p className="truncate font-semibold text-zinc-900 dark:text-white">
              {user?.email}
            </p>
          </div>
        </div>

        <Separator />

        {/* Appearance section */}
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              <Moon size={18} />
            </span>
            <div>
              <p className="font-semibold text-zinc-900 dark:text-white">
                Modo escuro
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">
                Ajuste a aparência do painel.
              </p>
            </div>
          </div>
          <Switch
            checked={isDark}
            onCheckedChange={toggleMode}
            label="Ativar modo escuro"
          />
        </div>
      </div>

      {/* Danger zone */}
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
        <button
          type="button"
          className="flex w-full items-center gap-3 p-5 text-left transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
          onClick={async () => {
            await logout();
            await navigate({ to: "/login" });
          }}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <LogOut size={18} />
          </span>
          <div>
            <p className="font-semibold text-red-600">Sair da conta</p>
            <p className="mt-0.5 text-xs text-zinc-500">
              Você será redirecionado para o login.
            </p>
          </div>
        </button>
      </div>

      {/* Legacy button kept for keyboard/a11y fallback — visually hidden */}
      <Button
        variant="destructive"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onClick={async () => {
          await logout();
          await navigate({ to: "/login" });
        }}
      >
        <LogOut size={16} />
        Sair da conta
      </Button>
    </div>
  );
}
