import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@core/keys";
import { QUERY_STALE_TIME_MS, QUERY_GC_TIME_MS } from "@core/constants";
import { fetchCurrentUser } from "@core/api/auth";
import { fetchMyPage, fetchPublicPage, checkUsernameAvailable } from "@core/api/pages";
import { fetchLinks } from "@core/api/links";
import { fetchFolders } from "@core/api/folders";
import { fetchThemes } from "@core/api/themes";
import { fetchOverviewStats, fetchLinkClickStats } from "@core/api/stats";
import { fetchSubscription } from "@core/api/plan";

export const currentUserQuery = queryOptions({
  queryKey: queryKeys.auth.me.queryKey,
  queryFn: fetchCurrentUser,
  staleTime: QUERY_STALE_TIME_MS,
});

export const myPageQuery = queryOptions({
  queryKey: queryKeys.page.mine.queryKey,
  queryFn: fetchMyPage,
  staleTime: QUERY_STALE_TIME_MS,
  gcTime: QUERY_GC_TIME_MS,
});

export function publicPageQuery(username: string) {
  return queryOptions({
    queryKey: queryKeys.page.public(username).queryKey,
    queryFn: () => fetchPublicPage(username),
    staleTime: QUERY_STALE_TIME_MS,
  });
}

export function usernameAvailableQuery(username: string) {
  return queryOptions({
    queryKey: queryKeys.page.usernameAvailable(username).queryKey,
    queryFn: () => checkUsernameAvailable(username),
    enabled: username.length >= 3,
    staleTime: 0,
  });
}

export const linksQuery = queryOptions({
  queryKey: queryKeys.links.all.queryKey,
  queryFn: fetchLinks,
  staleTime: QUERY_STALE_TIME_MS,
});

export const foldersQuery = queryOptions({
  queryKey: queryKeys.folders.all.queryKey,
  queryFn: fetchFolders,
  staleTime: QUERY_STALE_TIME_MS,
});

export const themesQuery = queryOptions({
  queryKey: queryKeys.themes.all.queryKey,
  queryFn: fetchThemes,
  staleTime: QUERY_GC_TIME_MS,
});

export const overviewStatsQuery = queryOptions({
  queryKey: queryKeys.stats.overview.queryKey,
  queryFn: fetchOverviewStats,
  staleTime: QUERY_STALE_TIME_MS,
});

export const linkClickStatsQuery = queryOptions({
  queryKey: queryKeys.stats.linkClicks.queryKey,
  queryFn: fetchLinkClickStats,
  staleTime: QUERY_STALE_TIME_MS,
});

export const subscriptionQuery = queryOptions({
  queryKey: queryKeys.subscription.mine.queryKey,
  queryFn: fetchSubscription,
  staleTime: QUERY_STALE_TIME_MS,
});
