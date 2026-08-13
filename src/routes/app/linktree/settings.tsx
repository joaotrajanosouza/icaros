import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Header } from "@ui/header";
import { Button } from "@ui/button";
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

      <div className="rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-sm text-zinc-500">Conta conectada</p>
        <p className="mt-1 font-semibold text-zinc-900 dark:text-white">{user?.email}</p>
      </div>

      <div className="flex items-center justify-between rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
        <div>
          <p className="font-semibold text-zinc-900 dark:text-white">Modo escuro</p>
          <p className="mt-1 text-sm text-zinc-500">
            Ajuste a aparência do painel para seus olhos.
          </p>
        </div>
        <Switch
          checked={isDark}
          onCheckedChange={toggleMode}
          label="Ativar modo escuro"
        />
      </div>

      <Button
        variant="destructive"
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
