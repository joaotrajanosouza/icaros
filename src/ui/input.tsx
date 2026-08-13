import { forwardRef, type InputHTMLAttributes } from "react";
import { cx } from "@ui/variants";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      data-slot="input"
      aria-invalid={invalid}
      className={cx(
        "h-12 w-full rounded-xl border bg-white px-4 text-base text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors",
        "focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10",
        invalid ? "border-red-400" : "border-zinc-200",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
