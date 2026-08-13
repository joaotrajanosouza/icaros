import { PUBLIC_PAGE_DOMAIN } from "@core/constants";

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * URL de exibição/cópia da página pública no formato de marca Icaros.
 * Para navegação interna use rotas relativas (e.g. `/${username}`).
 */
export function publicPageUrl(username: string, folderSlug?: string): string {
  const base = `${PUBLIC_PAGE_DOMAIN}/${username}`;
  return folderSlug ? `${base}/${folderSlug}` : base;
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR", { notation: "compact" }).format(value);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
