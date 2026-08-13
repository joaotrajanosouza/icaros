export const APP_NAME = "Icaros";

export const PUBLIC_PAGE_DOMAIN = "icaros";


export const PLAN_LIMITS = {
  free: {
    maxPages: 1,
    maxButtons: 5,
    maxFolders: 1,
    showBrand: true,
    themesTier: "basic",
    statsTier: "simple",
  },
  paid: {
    maxPages: 1,
    maxButtons: Number.POSITIVE_INFINITY,
    maxFolders: Number.POSITIVE_INFINITY,
    showBrand: false,
    themesTier: "premium",
    statsTier: "full",
  },
} as const;

export type PlanId = keyof typeof PLAN_LIMITS;

export const QUERY_STALE_TIME_MS = 30_000;
export const QUERY_GC_TIME_MS = 5 * 60_000;
