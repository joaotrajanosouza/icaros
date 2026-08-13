import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";

export { cva };
export type { VariantProps };

export function cx(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
