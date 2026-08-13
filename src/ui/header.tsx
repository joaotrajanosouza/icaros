import type { ReactNode } from "react";
import { cx } from "@ui/variants";

export function Header({
  title,
  action,
  className,
}: {
  title: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cx("flex items-center justify-between gap-4 py-2", className)}>
      <h1 className="text-xl font-bold text-zinc-900">{title}</h1>
      {action}
    </header>
  );
}
