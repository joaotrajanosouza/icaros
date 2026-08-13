import { http, HttpResponse, delay } from "msw";
import { createId } from "@core/ids";
import { slugify } from "@core/utils";
import {
  seedUser,
  seedPage,
  seedThemes,
  seedFolders,
  seedLinks,
  seedSubscription,
  takenUsernames,
} from "@mocks/seed-data";
import type { LinkButtonInput } from "@core/api/links";

let currentUser = { ...seedUser };
let currentPage = { ...seedPage };
let links = [...seedLinks];
let folders = [...seedFolders];
let loggedIn = false;

const LATENCY_MS = 350;

export const handlers = [
  http.get("/api/auth/me", async () => {
    await delay(LATENCY_MS);
    return HttpResponse.json(loggedIn ? currentUser : null);
  }),

  http.post("/api/auth/google", async () => {
    await delay(LATENCY_MS);
    loggedIn = true;
    return HttpResponse.json(currentUser);
  }),

  http.post("/api/auth/logout", async () => {
    await delay(150);
    loggedIn = false;
    return HttpResponse.json({ ok: true });
  }),

  http.get("/api/pages/me", async () => {
    await delay(LATENCY_MS);
    return HttpResponse.json(currentPage);
  }),

  http.get("/api/pages/public/:username", async ({ params }) => {
    await delay(LATENCY_MS);
    if (params.username !== currentPage.username) {
      return HttpResponse.json(
        { title: "Página não encontrada", detail: "Confira se a URL está certa." },
        { status: 404, headers: { "content-type": "application/problem+json" } },
      );
    }
    return HttpResponse.json(currentPage);
  }),

  http.get("/api/pages/username-available/:username", async ({ params }) => {
    await delay(200);
    const username = slugify(String(params.username));
    const available = !takenUsernames.has(username) || username === currentPage.username;
    return HttpResponse.json({ available });
  }),

  http.patch("/api/pages/me", async ({ request }) => {
    await delay(LATENCY_MS);
    const body = (await request.json()) as Partial<typeof currentPage>;
    currentPage = { ...currentPage, ...body, updatedAt: new Date().toISOString() };
    return HttpResponse.json(currentPage);
  }),

  http.get("/api/links", async () => {
    await delay(LATENCY_MS);
    return HttpResponse.json(links);
  }),

  http.post("/api/links", async ({ request }) => {
    await delay(LATENCY_MS);
    const body = (await request.json()) as LinkButtonInput;
    const newLink = {
      id: createId("link"),
      pageId: currentPage.id,
      order: links.filter((link) => link.folderId === body.folderId).length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...body,
    };
    links = [...links, newLink];
    return HttpResponse.json(newLink);
  }),

  http.patch("/api/links/reorder", async ({ request }) => {
    await delay(200);
    const body = (await request.json()) as { orderedIds: string[] };
    links = links.map((link) => {
      const index = body.orderedIds.indexOf(link.id);
      return index === -1 ? link : { ...link, order: index };
    });
    return HttpResponse.json(links);
  }),

  http.patch("/api/links/:id", async ({ params, request }) => {
    await delay(LATENCY_MS);
    const body = (await request.json()) as Partial<LinkButtonInput>;
    links = links.map((link) =>
      link.id === params.id ? { ...link, ...body, updatedAt: new Date().toISOString() } : link,
    );
    return HttpResponse.json(links.find((link) => link.id === params.id));
  }),

  http.delete("/api/links/:id", async ({ params }) => {
    await delay(LATENCY_MS);
    links = links.filter((link) => link.id !== params.id);
    return HttpResponse.json({ ok: true });
  }),

  http.get("/api/folders", async () => {
    await delay(LATENCY_MS);
    return HttpResponse.json(folders);
  }),

  http.post("/api/folders", async ({ request }) => {
    await delay(LATENCY_MS);
    const body = (await request.json()) as { name: string };
    const newFolder = {
      id: createId("folder"),
      pageId: currentPage.id,
      name: body.name,
      slug: slugify(body.name),
      order: folders.length,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    folders = [...folders, newFolder];
    return HttpResponse.json(newFolder);
  }),

  http.patch("/api/folders/:id", async ({ params, request }) => {
    await delay(LATENCY_MS);
    const body = (await request.json()) as Partial<{ name: string; active: boolean; order: number }>;
    folders = folders.map((folder) => (folder.id === params.id ? { ...folder, ...body } : folder));
    return HttpResponse.json(folders.find((folder) => folder.id === params.id));
  }),

  http.delete("/api/folders/:id", async ({ params }) => {
    await delay(LATENCY_MS);
    folders = folders.filter((folder) => folder.id !== params.id);
    links = links.filter((link) => link.folderId !== params.id);
    return HttpResponse.json({ ok: true });
  }),

  http.get("/api/themes", async () => {
    await delay(200);
    return HttpResponse.json(seedThemes);
  }),

  http.get("/api/stats/overview", async () => {
    await delay(LATENCY_MS);
    return HttpResponse.json({ totalViews: 482, totalClicks: 176 });
  }),

  http.get("/api/stats/links", async () => {
    await delay(LATENCY_MS);
    return HttpResponse.json(
      links.map((link, index) => ({
        linkId: link.id,
        title: link.title,
        clicks: Math.max(0, 60 - index * 17),
      })),
    );
  }),

  http.post("/api/stats/page-view/:username", async () => {
    return HttpResponse.json({ ok: true });
  }),

  http.post("/api/stats/link-click/:id", async () => {
    return HttpResponse.json({ ok: true });
  }),

  http.get("/api/subscription", async () => {
    await delay(200);
    return HttpResponse.json(seedSubscription);
  }),

  http.post("/api/subscription/checkout", async () => {
    await delay(400);
    // Endpoint preparado para a integração real com AppMax: no MVP, sem
    // credenciais, devolvemos uma URL de checkout mockada.
    return HttpResponse.json({ checkoutUrl: "https://checkout.appmax.com.br/mock-session" });
  }),
];
