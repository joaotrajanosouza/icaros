import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Locale } from "@core/i18n";

type AppState = {
  locale: Locale;
  sidebarCollapsed: boolean;
  setLocale: (locale: Locale) => void;
  toggleSidebar: () => void;
};

// Só preferências de UI não sensíveis entram aqui. Nada de token, e-mail ou
// dado de sessão nesta store persistida.
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      locale: "pt-BR",
      sidebarCollapsed: false,
      setLocale: (locale) => set({ locale }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    {
      name: "icaros-app-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
