import { defineApiRoute, httpResource } from "@core/http-resource";

export type LinkButton = {
  id: string;
  pageId: string;
  folderId: string | null;
  title: string;
  url: string;
  icon: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LinkButtonInput = {
  title: string;
  url: string;
  icon: string;
  folderId: string | null;
  active: boolean;
};

export async function fetchLinks(): Promise<LinkButton[]> {
  return httpResource(defineApiRoute<LinkButton[]>({ method: "GET", path: "/api/links" }));
}

export async function createLink(input: LinkButtonInput): Promise<LinkButton> {
  return httpResource(defineApiRoute<LinkButton>({ method: "POST", path: "/api/links" }), {
    body: input,
  });
}

export async function updateLink(id: string, input: Partial<LinkButtonInput>): Promise<LinkButton> {
  return httpResource(defineApiRoute<LinkButton>({ method: "PATCH", path: `/api/links/${id}` }), {
    body: input,
  });
}

export async function deleteLink(id: string): Promise<void> {
  await httpResource(defineApiRoute<void>({ method: "DELETE", path: `/api/links/${id}` }));
}

export async function reorderLinks(orderedIds: string[]): Promise<LinkButton[]> {
  return httpResource(
    defineApiRoute<LinkButton[]>({ method: "PATCH", path: "/api/links/reorder" }),
    { body: { orderedIds } },
  );
}
