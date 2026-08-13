import { useQuery } from "@tanstack/react-query";
import { themesQuery } from "@core/queries";
import { Loading } from "@ui/loading";
import { Button } from "@ui/button";
import { ThemePreviewCard } from "@features/themes/theme-preview-card";
import { useMessages } from "@core/i18n";

export function ThemeStep({
  selectedThemeId,
  onSelect,
  onFinish,
  submitting,
}: {
  selectedThemeId: string;
  onSelect: (themeId: string) => void;
  onFinish: () => void;
  submitting: boolean;
}) {
  const messages = useMessages();
  const { data: themes, isLoading } = useQuery(themesQuery);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">{messages.onboarding.themeTitle}</h1>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {themes?.map((theme) => (
            <ThemePreviewCard
              key={theme.id}
              theme={theme}
              selected={theme.id === selectedThemeId}
              onSelect={() => onSelect(theme.id)}
            />
          ))}
        </div>
      )}

      <Button size="lg" disabled={!selectedThemeId || submitting} onClick={onFinish}>
        {submitting ? "Publicando..." : messages.onboarding.finish}
      </Button>
    </div>
  );
}
