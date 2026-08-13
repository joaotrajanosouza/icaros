import { useState } from "react";
import { GripVertical, Pencil, Trash2, Link2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { linksQuery, foldersQuery } from "@core/queries";
import { Button } from "@ui/button";
import { Switch } from "@ui/switch";
import { Loading } from "@ui/loading";
import { EmptyState } from "@pattern/empty-state";
import { LinkDialog } from "@features/page-editor/link-dialog";
import { useLinkMutations } from "@features/page-editor/hooks";
import { getIconOption } from "@pattern/icon-catalog";
import { useMessages } from "@core/i18n";
import { cx } from "@ui/variants";
import type { LinkButton } from "@core/api/links";

export function LinkList() {
  const messages = useMessages();
  const { data: links, isLoading } = useQuery(linksQuery);
  const { data: folders } = useQuery(foldersQuery);
  const { create, update, remove, reorder } = useLinkMutations();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkButton | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);

  if (isLoading) return <Loading />;

  const mainLinks = (links ?? []).filter((link) => link.folderId === null).sort((a, b) => a.order - b.order);

  function handleDrop(targetId: string) {
    if (!dragId || dragId === targetId || !links) return;
    const ids = mainLinks.map((link) => link.id);
    const fromIndex = ids.indexOf(dragId);
    const toIndex = ids.indexOf(targetId);
    if (fromIndex === -1 || toIndex === -1) return;
    const reordered = [...ids];
    reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, dragId);
    reorder.mutate(reordered);
    setDragId(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => {
          setEditingLink(null);
          setDialogOpen(true);
        }}
      >
        {messages.linkEditor.addLink}
      </Button>

      {mainLinks.length === 0 ? (
        <EmptyState icon={Link2} title={messages.emptyStates.noLinks} />
      ) : (
        <ul className="flex flex-col gap-2">
          {mainLinks.map((link) => {
            const IconComponent = getIconOption(link.icon).icon;
            return (
              <li
                key={link.id}
                draggable
                onDragStart={() => setDragId(link.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => handleDrop(link.id)}
                className={cx(
                  "flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-3 transition-opacity",
                  dragId === link.id ? "opacity-50" : "opacity-100",
                )}
              >
                <span className="cursor-grab text-zinc-300">
                  <GripVertical size={18} />
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <IconComponent size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-zinc-900">{link.title}</p>
                  <p className="truncate text-xs text-zinc-400">{link.url}</p>
                </div>
                <Switch
                  checked={link.active}
                  onCheckedChange={(active) => update.mutate({ id: link.id, input: { active } })}
                />
                <button
                  type="button"
                  onClick={() => {
                    setEditingLink(link);
                    setDialogOpen(true);
                  }}
                  className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                >
                  <Pencil size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => remove.mutate(link.id)}
                  className="rounded-lg p-2 text-zinc-400 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <LinkDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        link={editingLink}
        folders={folders ?? []}
        submitting={create.isPending || update.isPending}
        onSubmit={(input) => {
          if (editingLink) {
            update.mutate({ id: editingLink.id, input });
          } else {
            create.mutate(input);
          }
          setDialogOpen(false);
        }}
      />
    </div>
  );
}
