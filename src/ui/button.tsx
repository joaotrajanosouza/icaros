import { forwardRef, type ButtonHTMLAttributes } from "react";
import { buttonVariants } from "@ui/button.variants";
import { cx, type VariantProps } from "@ui/variants";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      data-slot="button"
      data-variant={variant ?? "primary"}
      className={cx(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
