import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { themesQuery, myPageQuery } from "@core/queries";
import { updateMyPage } from "@core/api/pages";
import { Loading } from "@ui/loading";
import { ThemePreviewCard } from "@features/themes/theme-preview-card";
import { toast } from "@ui/toaster";

export function ThemeGallery({ currentThemeId, isPaidPlan }: { currentThemeId: string; isPaidPlan: boolean }) {
  const { data: themes, isLoading } = useQuery(themesQuery);
  const queryClient = useQueryClient();

  const applyTheme = useMutation({
    mutationFn: (themeId: string) => updateMyPage({ themeId }),
    onSuccess: (page) => {
      queryClient.setQueryData(myPageQuery.queryKey, page);
      toast("Tema aplicado à sua página.");
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {themes?.map((theme) => (
        <ThemePreviewCard
          key={theme.id}
          theme={theme}
          selected={theme.id === currentThemeId}
          locked={theme.tier === "premium" && !isPaidPlan}
          onSelect={() => applyTheme.mutate(theme.id)}
        />
      ))}
    </div>
  );
}
