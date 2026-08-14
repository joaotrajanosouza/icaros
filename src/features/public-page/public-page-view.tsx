import { useQuery } from "@tanstack/react-query";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { publicPageQuery, themesQuery, linksQuery, foldersQuery } from "@core/queries";
import { getIconOption } from "@pattern/icon-catalog";
import { Avatar, AvatarImage, AvatarFallback } from "@ui/avatar";
import { Loading } from "@ui/loading";
import { APP_NAME } from "@core/constants";
import { usePageViewTracking, trackLinkClick } from "@features/public-page/hooks";
import { themeButtonClassName, themeButtonStyle } from "@features/public-page/theme-styles";
import type { LinkButton } from "@core/api/links";

export function PublicPageView({ username, folderSlug }: { username: string; folderSlug?: string }) {
  usePageViewTracking(username);

  const { data: page, isLoading: pageLoading } = useQuery(publicPageQuery(username));
  const { data: themes } = useQuery(themesQuery);
  const { data: links, isLoading: linksLoading } = useQuery(linksQuery);
  const { data: folders } = useQuery(foldersQuery);

  if (pageLoading || linksLoading || !page) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Loading />
      </div>
    );
  }

  const theme = themes?.find((item) => item.id === page.themeId) ?? themes?.[0];
  const activeFolder = folderSlug ? folders?.find((folder) => folder.slug === folderSlug) : undefined;

  const visibleLinks: LinkButton[] = (links ?? [])
    .filter((link) => link.active)
    .filter((link) => (activeFolder ? link.folderId === activeFolder.id : link.folderId === null))
    .sort((a, b) => a.order - b.order);

  const mainFolders = (folders ?? []).filter((folder) => folder.active);

  return (
    <div
      className="flex min-h-dvh flex-col items-center px-5 py-10"
      style={{ background: theme?.background ?? "#fafafa" }}
    >
      <div className="flex w-full max-w-sm flex-1 flex-col items-center">
        {activeFolder ? (
          <a
            href={`/${username}`}
            className="mb-4 flex items-center gap-1 self-start text-sm font-medium"
            style={{ color: theme?.textColor }}
          >
            <ArrowLeft size={16} />
            Voltar
          </a>
        ) : null}

        <Avatar className="h-[88px] w-[88px]">
          <AvatarImage src={page.avatarUrl ?? undefined} alt={page.displayName} />
          <AvatarFallback>{page.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h1 className="mt-4 text-xl font-bold" style={{ color: theme?.textColor }}>
          {activeFolder ? activeFolder.name : page.displayName}
        </h1>
        {!activeFolder && page.bio ? (
          <p className="mt-1 text-center text-sm opacity-80" style={{ color: theme?.textColor }}>
            {page.bio}
          </p>
        ) : null}

        <div className="mt-8 flex w-full flex-col gap-3">
          {visibleLinks.map((link) => {
            const Icon = getIconOption(link.icon).icon;
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackLinkClick(link.id)}
                className={theme ? themeButtonClassName(theme) : ""}
                style={theme ? themeButtonStyle(theme) : undefined}
              >
                <Icon size={20} />
                <span className="flex-1">{link.title}</span>
              </a>
            );
          })}

          {!activeFolder &&
            mainFolders.map((folder) => (
              <a
                key={folder.id}
                href={`/${username}/${folder.slug}`}
                className={theme ? themeButtonClassName(theme) : ""}
                style={theme ? themeButtonStyle(theme) : undefined}
              >
                <span className="flex-1">{folder.name}</span>
                <ChevronRight size={18} />
              </a>
            ))}
        </div>
      </div>

      <p className="mt-10 text-xs opacity-60" style={{ color: theme?.textColor }}>
        {APP_NAME}
      </p>
    </div>
  );
}
