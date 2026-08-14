import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@ui/utils";

export function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "mb-1.5 block text-sm font-medium leading-none text-zinc-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
}
