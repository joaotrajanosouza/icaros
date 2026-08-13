import { defineApiRoute, httpResource } from "@core/http-resource";

export type Page = {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string | null;
  themeId: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function fetchMyPage(): Promise<Page> {
  return httpResource(defineApiRoute<Page>({ method: "GET", path: "/api/pages/me" }));
}

export async function fetchPublicPage(username: string): Promise<Page> {
  return httpResource(
    defineApiRoute<Page>({ method: "GET", path: `/api/pages/public/${username}` }),
  );
}

export async function checkUsernameAvailable(username: string): Promise<{ available: boolean }> {
  return httpResource(
    defineApiRoute<{ available: boolean }>({
      method: "GET",
      path: `/api/pages/username-available/${username}`,
    }),
  );
}

export type UpdatePageInput = Partial<
  Pick<Page, "username" | "displayName" | "bio" | "avatarUrl" | "themeId" | "published">
>;

export async function updateMyPage(input: UpdatePageInput): Promise<Page> {
  return httpResource(defineApiRoute<Page>({ method: "PATCH", path: "/api/pages/me" }), {
    body: input,
  });
}
