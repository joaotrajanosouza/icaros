import { defineApiRoute, httpResource } from "@core/http-resource";

export type OverviewStats = {
  totalViews: number;
  totalClicks: number;
};

export type LinkClickStat = {
  linkId: string;
  title: string;
  clicks: number;
};

export async function fetchOverviewStats(): Promise<OverviewStats> {
  return httpResource(
    defineApiRoute<OverviewStats>({ method: "GET", path: "/api/stats/overview" }),
  );
}

export async function fetchLinkClickStats(): Promise<LinkClickStat[]> {
  return httpResource(
    defineApiRoute<LinkClickStat[]>({ method: "GET", path: "/api/stats/links" }),
  );
}

export async function registerPageView(username: string): Promise<void> {
  await httpResource(
    defineApiRoute<void>({ method: "POST", path: `/api/stats/page-view/${username}` }),
  );
}

export async function registerLinkClick(linkId: string): Promise<void> {
  await httpResource(
    defineApiRoute<void>({ method: "POST", path: `/api/stats/link-click/${linkId}` }),
  );
}
