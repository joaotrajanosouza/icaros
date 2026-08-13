import type { Theme } from "@core/api/themes";
import { cx } from "@ui/variants";

export function themeButtonClassName(theme: Theme): string {
  return cx(
    "flex w-full items-center gap-3 px-5 py-4 text-left font-semibold transition-transform active:scale-[0.98]",
    theme.radius === "full" ? "rounded-full" : theme.radius === "lg" ? "rounded-2xl" : "rounded-md",
    theme.buttonStyle === "outline" ? "border-2 bg-transparent" : "",
    theme.shadow ? "shadow-md" : "",
  );
}

export function themeButtonStyle(theme: Theme): React.CSSProperties {
  return {
    backgroundColor: theme.buttonStyle === "outline" ? "transparent" : theme.buttonColor,
    borderColor: theme.buttonColor,
    color: theme.buttonStyle === "outline" ? theme.buttonColor : "#fff",
  };
}
