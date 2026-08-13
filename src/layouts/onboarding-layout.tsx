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
        <BrandLockup markSize={30} className="mb-4" />
        <div className="mb-8 flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full ${index < step ? "bg-violet-600" : "bg-zinc-100"}`}
            />
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}
