import { useState } from "react";
import { FolderOpen, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { foldersQuery, linksQuery } from "@core/queries";
import { EmptyState } from "@pattern/empty-state";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Loading } from "@ui/loading";
import { getIconOption } from "@pattern/icon-catalog";
import { useFolderMutations } from "@features/folder/hooks";
import { useMessages } from "@core/i18n";
import { publicPageUrl } from "@core/utils";

export function FolderPanel({ username, canCreateFolder }: { username: string; canCreateFolder: boolean }) {
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
          <div className="flex gap-2">
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex: Materiais gratuitos"
            />
            <Button disabled={!name || create.isPending} onClick={() => create.mutate(name)}>
              {messages.common.add}
            </Button>
          </div>
        ) : (
          <p className="text-center text-sm text-zinc-400">
            Seu plano grátis permite 1 subpasta. Crie a sua para organizar links extras.
          </p>
        )}
      </div>
    );
  }

  const folderLinks = (links ?? []).filter((link) => link.folderId === folder.id);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4">
        <div>
          <p className="font-semibold text-zinc-900">{folder.name}</p>
          <p className="text-xs text-zinc-400">{publicPageUrl(username, folder.slug)}</p>
        </div>
        <button
          type="button"
          onClick={() => remove.mutate(folder.id)}
          className="rounded-lg p-2 text-zinc-400 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {folderLinks.length === 0 ? (
        <p className="text-center text-sm text-zinc-400">
          Nenhum link nessa subpasta ainda. Adicione pela tela de Botões/links, escolhendo "Subpasta".
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {folderLinks.map((link) => {
            const Icon = getIconOption(link.icon).icon;
            return (
              <li key={link.id} className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <Icon size={18} />
                </span>
                <p className="text-sm font-semibold text-zinc-900">{link.title}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
