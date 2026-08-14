import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@ui/utils";

/** Custom avatar that keeps the same API as before, now powered by Radix Avatar. */
export function Avatar({
  src,
  name,
  size = 64,
  className,
}: {
  src?: string | null;
  name: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-violet-100",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <AvatarPrimitive.Image
          src={src}
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : null}
      <AvatarPrimitive.Fallback
        className="flex h-full w-full items-center justify-center font-bold text-violet-700"
        style={{ fontSize: size * 0.38 }}
      >
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

// Named re-exports of primitives for advanced composition in Task #5.
export {
  AvatarPrimitive as AvatarRoot,
};
