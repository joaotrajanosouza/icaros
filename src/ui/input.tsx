import { forwardRef } from "react";
import { cn } from "@ui/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      data-slot="input"
      aria-invalid={invalid}
      className={cn(
        "h-12 w-full rounded-xl border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground outline-none transition-colors",
        "focus:border-primary focus:ring-4 focus:ring-primary/10",
        invalid ? "border-destructive" : "border-input",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
