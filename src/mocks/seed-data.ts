import type { SessionUser } from "@core/session-store";
import type { Page } from "@core/api/pages";
import type { LinkButton } from "@core/api/links";
import type { Folder } from "@core/api/folders";
import type { Theme } from "@core/api/themes";
import type { Subscription } from "@core/api/plan";

export const seedUser: SessionUser = {
  id: "user_1",
  name: "João Trajano",
  email: "joao@example.com",
  avatarUrl: null,
  planId: "free",
};

export const seedPage: Page = {
  id: "page_1",
  userId: "user_1",
  username: "joao-trajano",
  displayName: "João Trajano",
  bio: "Desenvolvedor e criador de conteúdo",
  avatarUrl: null,
  themeId: "theme_dark",
  published: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const seedThemes: Theme[] = [
  {
    id: "theme_light",
    name: "Claro minimalista",
    tier: "basic",
    background: "#ffffff",
    buttonStyle: "outline",
    buttonColor: "#18181b",
    textColor: "#18181b",
    radius: "lg",
    shadow: false,
  },
  {
    id: "theme_dark",
    name: "Escuro moderno",
    tier: "basic",
    background: "#0f0f12",
    buttonStyle: "solid",
    buttonColor: "#27272a",
    textColor: "#ffffff",
    radius: "lg",
    shadow: false,
  },
  {
    id: "theme_neon",
    name: "Neon jovem",
    tier: "premium",
    background: "linear-gradient(160deg,#7c3aed,#db2777)",
    buttonStyle: "glass",
    buttonColor: "#ffffff",
    radius: "full",
    textColor: "#ffffff",
    shadow: true,
  },
  {
    id: "theme_pro",
    name: "Profissional",
    tier: "premium",
    background: "#f4f4f5",
    buttonStyle: "solid",
    buttonColor: "#1d4ed8",
    textColor: "#18181b",
    radius: "sm",
    shadow: true,
  },
  {
    id: "theme_creator",
    name: "Criador de conteúdo",
    tier: "premium",
    background: "linear-gradient(160deg,#f59e0b,#ef4444)",
    buttonStyle: "solid",
    buttonColor: "#18181b",
    textColor: "#ffffff",
    radius: "full",
    shadow: true,
  },
];

export const seedFolders: Folder[] = [
  {
    id: "folder_1",
    pageId: "page_1",
    name: "Materiais gratuitos",
    slug: "materiais-gratuitos",
    order: 0,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const seedLinks: LinkButton[] = [
  {
    id: "link_1",
    pageId: "page_1",
    folderId: null,
    title: "Instagram",
    url: "https://instagram.com/joaotrajano",
    icon: "instagram",
    order: 0,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "link_2",
    pageId: "page_1",
    folderId: null,
    title: "WhatsApp",
    url: "https://wa.me/5511999999999",
    icon: "whatsapp",
    order: 1,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "link_3",
    pageId: "page_1",
    folderId: null,
    title: "Consultoria",
    url: "https://joaotrajano.com/consultoria",
    icon: "servico",
    order: 2,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "link_4",
    pageId: "page_1",
    folderId: "folder_1",
    title: "E-book grátis",
    url: "https://joaotrajano.com/ebook",
    icon: "download",
    order: 0,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const seedSubscription: Subscription = {
  id: "sub_1",
  planId: "free",
  status: "active",
  provider: null,
  currentPeriodEnd: null,
};

export const takenUsernames = new Set(["joao-trajano", "admin", "icaros"]);
