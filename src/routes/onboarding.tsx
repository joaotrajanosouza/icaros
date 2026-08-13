import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingLayout } from "@layouts/onboarding-layout";
import { UsernameStep } from "@features/onboarding/username-step";
import { ThemeStep } from "@features/onboarding/theme-step";
import { useCompleteOnboarding } from "@features/onboarding/hooks";
import { toast } from "@ui/toaster";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [username, setUsername] = useState("");
  const [themeId, setThemeId] = useState("");
  const complete = useCompleteOnboarding();

  async function handleFinish() {
    try {
      await complete.mutateAsync({ username, themeId });
      toast("Sua página já está no ar. 🎉");
      await navigate({ to: "/app/linktree" });
    } catch {
      toast("Não foi possível publicar sua página. Tenta de novo.", "error");
    }
  }

  return (
    <OnboardingLayout step={step} totalSteps={2}>
      {step === 1 ? (
        <UsernameStep
          defaultValue={username}
          onNext={(value) => {
            setUsername(value);
            setStep(2);
          }}
        />
      ) : (
        <ThemeStep
          selectedThemeId={themeId}
          onSelect={setThemeId}
          onFinish={handleFinish}
          submitting={complete.isPending}
        />
      )}
    </OnboardingLayout>
  );
}
