import { createRootRoute, Outlet } from "@tanstack/react-router";
import { I18nContext } from "@core/i18n";
import { ptBR } from "@core/locales/pt-BR";
import { Toaster } from "@ui/toaster";
import { WidgetBoundary } from "@pattern/widget-boundary";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <I18nContext.Provider value={ptBR}>
      <WidgetBoundary fallbackTitle="Algo deu errado ao carregar o Icaros.">
        <Outlet />
      </WidgetBoundary>
      <Toaster />
    </I18nContext.Provider>
  );
}
