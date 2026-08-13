import { defineApiRoute, httpResource } from "@core/http-resource";

export type Folder = {
  id: string;
  pageId: string;
  name: string;
  slug: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function fetchFolders(): Promise<Folder[]> {
  return httpResource(defineApiRoute<Folder[]>({ method: "GET", path: "/api/folders" }));
}

export async function createFolder(input: { name: string }): Promise<Folder> {
  return httpResource(defineApiRoute<Folder>({ method: "POST", path: "/api/folders" }), {
    body: input,
  });
}

export async function updateFolder(
  id: string,
  input: Partial<Pick<Folder, "name" | "active" | "order">>,
): Promise<Folder> {
  return httpResource(defineApiRoute<Folder>({ method: "PATCH", path: `/api/folders/${id}` }), {
    body: input,
  });
}

export async function deleteFolder(id: string): Promise<void> {
  await httpResource(defineApiRoute<void>({ method: "DELETE", path: `/api/folders/${id}` }));
}
