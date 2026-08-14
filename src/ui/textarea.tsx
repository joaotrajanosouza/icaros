import { forwardRef } from "react";
import { cn } from "@ui/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      data-slot="textarea"
      aria-invalid={invalid}
      className={cn(
        "w-full resize-none rounded-xl border bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors",
        "focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10",
        invalid ? "border-red-400" : "border-zinc-200",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
