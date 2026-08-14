import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "icaros-appearance";

export type AppearanceMode = "light" | "dark";

type AppearanceContextValue = {
  mode: AppearanceMode;
  isDark: boolean;
  setMode: (mode: AppearanceMode) => void;
  toggleMode: () => void;
};

const AppearanceContext = createContext<AppearanceContextValue | null>(null);

function getInitialMode(): AppearanceMode {
  if (typeof window === "undefined") return "light";
  return window.localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
}

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AppearanceMode>(getInitialMode);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = mode;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  function setMode(nextMode: AppearanceMode) {
    setModeState(nextMode);
  }

  function toggleMode() {
    setModeState((currentMode) => (currentMode === "dark" ? "light" : "dark"));
  }

  return (
    <AppearanceContext.Provider
      value={{ mode, isDark: mode === "dark", setMode, toggleMode }}
    >
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance(): AppearanceContextValue {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error("useAppearance precisa estar dentro de <AppearanceProvider>");
  }
  return context;
}
