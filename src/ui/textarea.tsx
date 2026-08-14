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
        "w-full resize-none rounded-xl border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground outline-none transition-colors",
        "focus:border-primary focus:ring-4 focus:ring-primary/10",
        invalid ? "border-destructive" : "border-input",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
