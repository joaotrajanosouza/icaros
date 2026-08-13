import { Loader2 } from "lucide-react";
import { cx } from "@ui/variants";

export function Loading({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-10 text-sm text-zinc-500">
      <Loader2 size={18} className="animate-spin" />
      {label}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cx("animate-pulse rounded-xl bg-zinc-100", className)} />;
}
