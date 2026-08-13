import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Header } from "@ui/header";
import { Button } from "@ui/button";
import { useAuth } from "@core/auth-context";
import { useMessages } from "@core/i18n";

export const Route = createFileRoute("/app/linktree/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const messages = useMessages();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <Header title={messages.dashboard.settings} />

      <div className="rounded-3xl border border-zinc-200 bg-white p-5">
        <p className="text-sm text-zinc-500">Conta conectada</p>
        <p className="mt-1 font-semibold text-zinc-900">{user?.email}</p>
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
