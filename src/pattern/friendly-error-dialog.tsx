import { AlertTriangle } from "lucide-react";
import { Button } from "@ui/button";
import type { FriendlyError } from "@core/http-resource";

export function FriendlyErrorDialog({
  error,
  onRetry,
  onDismiss,
}: {
  error: FriendlyError;
  onRetry?: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-xl">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle size={22} />
        </div>
        <h2 className="text-lg font-bold text-zinc-900">{error.title}</h2>
        <p className="mt-1 text-sm text-zinc-500">{error.detail}</p>
        <div className="mt-5 flex justify-center gap-2">
          <Button variant="secondary" onClick={onDismiss}>
            Fechar
          </Button>
          {onRetry ? <Button onClick={onRetry}>Tentar novamente</Button> : null}
        </div>
      </div>
    </div>
  );
}
