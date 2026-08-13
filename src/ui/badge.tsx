import type { HTMLAttributes } from "react";
import { cva } from "@ui/variants";
import { cx, type VariantProps } from "@ui/variants";

const badgeVariants = cva("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium", {
  variants: {
    tone: {
      neutral: "bg-zinc-100 text-zinc-700",
      success: "bg-emerald-100 text-emerald-700",
      warning: "bg-amber-100 text-amber-700",
      violet: "bg-violet-100 text-violet-700",
    },
  },
  defaultVariants: { tone: "neutral" },
});

type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span data-slot="badge" className={cx(badgeVariants({ tone }), className)} {...props} />;
}
