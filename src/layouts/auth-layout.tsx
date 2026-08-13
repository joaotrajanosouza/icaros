import type { ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-violet-50 to-white px-6">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
