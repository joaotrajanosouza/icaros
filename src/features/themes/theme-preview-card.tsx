import { Check, Lock } from "lucide-react";
import type { Theme } from "@core/api/themes";
import { cx } from "@ui/variants";

export function ThemePreviewCard({
  theme,
  selected,
  locked,
  onSelect,
}: {
  theme: Theme;
  selected: boolean;
  locked?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={locked}
      className={cx(
        "relative flex flex-col gap-3 rounded-2xl border p-4 text-left transition-all disabled:opacity-60",
        selected ? "border-violet-500 ring-2 ring-violet-500/20" : "border-zinc-200 hover:border-zinc-300",
      )}
      style={{ background: theme.background }}
    >
      {selected ? (
        <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white">
          <Check size={14} />
        </span>
      ) : locked ? (
        <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900/70 text-white">
          <Lock size={12} />
        </span>
      ) : null}

      <div className="flex flex-col gap-1.5">
        {[1, 2, 3].map((row) => (
          <div
            key={row}
            className={cx(
              "h-6 w-full",
              theme.radius === "full" ? "rounded-full" : theme.radius === "lg" ? "rounded-lg" : "rounded-sm",
              theme.buttonStyle === "outline" ? "border-2 bg-transparent" : "",
              theme.shadow ? "shadow-sm" : "",
            )}
            style={{
              backgroundColor: theme.buttonStyle === "outline" ? "transparent" : theme.buttonColor,
              borderColor: theme.buttonColor,
            }}
          />
        ))}
      </div>

      <p className="text-sm font-semibold" style={{ color: theme.textColor }}>
        {theme.name}
      </p>
    </button>
  );
}
