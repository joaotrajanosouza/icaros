import { createFileRoute } from "@tanstack/react-router";
import { Moon, User } from "lucide-react";
import { Header } from "@ui/header";
import { Separator } from "@ui/separator";
import { Switch } from "@ui/switch";
import { PlanCard } from "@features/plan/plan-card";
import { GlobalPageLayout } from "@layouts/global-page-layout";
import { useAuth } from "@core/auth-context";
import { useAppearance } from "@core/appearance-context";

export const Route = createFileRoute("/app/conta")({
  component: ContaPage,
});

function ContaPage() {
  const { user } = useAuth();
  const { isDark, toggleMode } = useAppearance();

  return (
    <GlobalPageLayout>
      <div className="flex flex-col gap-6">
        <Header title="Conta" description="Configurações da sua conta no Icaros" />

        {/* Conta + Aparência */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          {/* Conta conectada */}
          <div className="flex items-center gap-3 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Conta conectada
              </p>
              <p className="truncate font-semibold text-foreground">
                {user?.email}
              </p>
            </div>
          </div>

          <Separator />

          {/* Aparência */}
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Moon size={18} />
              </span>
              <div>
                <p className="font-semibold text-foreground">Modo escuro</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
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

        {/* Plano */}
        <div className="flex flex-col gap-3">
          <h2 className="px-1 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Plano
          </h2>
          <PlanCard />
        </div>
      </div>
    </GlobalPageLayout>
  );
}
