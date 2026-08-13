import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  action,
}: {
  icon: LucideIcon;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-zinc-200 px-6 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-violet-600">
        <Icon size={22} />
      </div>
      <p className="max-w-xs text-sm font-medium text-zinc-600">{title}</p>
      {action}
    </div>
  );
}
