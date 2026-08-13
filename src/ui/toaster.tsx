import { create } from "zustand";
import { CheckCircle2, XCircle } from "lucide-react";
import { cx } from "@ui/variants";

type Toast = { id: string; message: string; tone: "success" | "error" };

type ToasterState = {
  toasts: Toast[];
  push: (message: string, tone: Toast["tone"]) => void;
  dismiss: (id: string) => void;
};

export const useToaster = create<ToasterState>((set) => ({
  toasts: [],
  push: (message, tone) =>
    set((state) => ({
      toasts: [...state.toasts, { id: crypto.randomUUID(), message, tone }],
    })),
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}));

export function toast(message: string, tone: "success" | "error" = "success") {
  useToaster.getState().push(message, tone);
  const id = useToaster.getState().toasts.at(-1)?.id;
  if (id) setTimeout(() => useToaster.getState().dismiss(id), 3200);
}

export function Toaster() {
  const toasts = useToaster((state) => state.toasts);
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4">
      {toasts.map((item) => (
        <div
          key={item.id}
          className={cx(
            "pointer-events-auto flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium shadow-lg",
            item.tone === "success" ? "bg-zinc-900 text-white" : "bg-red-600 text-white",
          )}
        >
          {item.tone === "success" ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
          {item.message}
        </div>
      ))}
    </div>
  );
}
