/**
 * Toaster — backed by Sonner.
 * Exports a `toast(message, tone?)` helper that matches the previous API
 * so all existing call-sites work without changes.
 */
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast:
            "flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium shadow-lg",
          success: "bg-zinc-900 text-white",
          error: "bg-red-600 text-white",
        },
      }}
    />
  );
}

/**
 * Compatibility wrapper — keeps the previous `toast(msg, tone?)` signature.
 */
export function toast(message: string, tone: "success" | "error" = "success") {
  if (tone === "error") {
    sonnerToast.error(message);
  } else {
    sonnerToast.success(message);
  }
}
