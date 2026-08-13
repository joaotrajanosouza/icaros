import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usernameAvailableQuery, myPageQuery } from "@core/queries";
import { updateMyPage } from "@core/api/pages";
import { useDebouncedValue } from "@core/hooks";
import { slugify } from "@core/utils";

export function useUsernameAvailability(rawUsername: string) {
  const username = slugify(rawUsername);
  const debounced = useDebouncedValue(username, 350);
  const query = useQuery(usernameAvailableQuery(debounced));
  return {
    checking: debounced !== username || query.isFetching,
    available: query.data?.available ?? null,
  };
}

export function useCompleteOnboarding() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { username: string; themeId: string }) =>
      updateMyPage({ username: input.username, themeId: input.themeId, published: true }),
    onSuccess: (page) => {
      queryClient.setQueryData(myPageQuery.queryKey, page);
    },
  });
}
