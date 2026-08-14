import { useState } from "react";
import { FolderOpen, Trash2, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { foldersQuery, linksQuery } from "@core/queries";
import { EmptyState } from "@pattern/empty-state";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Loading } from "@ui/loading";
import { Separator } from "@ui/separator";
import { getIconOption } from "@pattern/icon-catalog";
import { useFolderMutations } from "@features/folder/hooks";
import { useMessages } from "@core/i18n";
import { publicPageUrl } from "@core/utils";

export function FolderPanel({
  username,
  canCreateFolder,
}: {
  username: string;
  canCreateFolder: boolean;
}) {
  const messages = useMessages();
  const { data: folders, isLoading } = useQuery(foldersQuery);
  const { data: links } = useQuery(linksQuery);
  const { create, remove } = useFolderMutations();
  const [name, setName] = useState("");

  if (isLoading) return <Loading />;

  const folder = folders?.[0];

  if (!folder) {
    return (
      <div className="flex flex-col gap-4">
        <EmptyState icon={FolderOpen} title={messages.emptyStates.noFolder} />

        {canCreateFolder ? (
          <div className="rounded-3xl border border-zinc-200 bg-white p-5">
            <p className="mb-4 text-sm font-semibold text-zinc-700">
              Criar subpasta
            </p>
            <div className="flex flex-col gap-3">
              <div>
                <Label htmlFor="folder-name">Nome da subpasta</Label>
                <Input
                  id="folder-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ex: Materiais gratuitos"
                />
              </div>
              <Button
                disabled={!name || create.isPending}
                onClick={() => create.mutate(name)}
              >
                {create.isPending ? "Criando..." : messages.common.add}
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 text-center">
            <p className="text-sm text-zinc-500">
              Seu plano grátis permite 1 subpasta. Crie a sua para organizar
              links extras.
            </p>
          </div>
        )}
      </div>
    );
  }

  const folderLinks = (links ?? []).filter((link) => link.folderId === folder.id);

  return (
    <div className="flex flex-col gap-4">
      {/* Folder card */}
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
        <div className="flex items-center gap-3 p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <FolderOpen size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-zinc-900">{folder.name}</p>
            <a
              href={publicPageUrl(username, folder.slug)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-violet-600 transition-colors"
            >
              {publicPageUrl(username, folder.slug)}
              <ExternalLink size={10} />
            </a>
          </div>
          <button
            type="button"
            onClick={() => remove.mutate(folder.id)}
            className="rounded-xl p-2 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
            aria-label="Excluir subpasta"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {folderLinks.length > 0 ? (
          <>
            <Separator />
            <div className="p-3">
              <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
                Links nesta pasta ({folderLinks.length})
              </p>
              <ul className="flex flex-col gap-1">
                {folderLinks.map((link) => {
                  const Icon = getIconOption(link.icon).icon;
                  return (
                    <li
                      key={link.id}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-zinc-50"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                        <Icon size={15} />
                      </span>
                      <p className="text-sm font-medium text-zinc-800">
                        {link.title}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        ) : (
          <>
            <Separator />
            <p className="px-5 py-4 text-center text-sm text-zinc-400">
              Nenhum link nessa subpasta ainda.{" "}
              <br className="hidden sm:block" />
              Adicione pela tela de{" "}
              <span className="font-medium text-zinc-600">Botões/links</span>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
