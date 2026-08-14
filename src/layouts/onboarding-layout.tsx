import type { ReactNode } from "react";
import { BrandLockup } from "@ui/brand-mark";

export function OnboardingLayout({
  step,
  totalSteps,
  children,
}: {
  step: number;
  totalSteps: number;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-white px-6 py-8">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <BrandLockup markSize={48} />
          <span className="text-xs font-medium tabular-nums text-zinc-400">
            Etapa {step} de {totalSteps}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-8 flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100"
            >
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  index < step ? "w-full bg-violet-600" : "w-0"
                }`}
              />
            </div>
          ))}
        </div>

        {children}
      </div>
    </div>
  );
}
