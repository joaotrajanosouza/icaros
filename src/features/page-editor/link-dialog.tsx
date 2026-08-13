import { useState } from "react";
import { Dialog } from "@ui/dialog";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { Switch } from "@ui/switch";
import { IconPicker } from "@pattern/icon-picker";
import { getIconOption } from "@pattern/icon-catalog";
import { useMessages } from "@core/i18n";
import type { LinkButton, LinkButtonInput } from "@core/api/links";
import type { Folder } from "@core/api/folders";

export function LinkDialog({
  open,
  onOpenChange,
  link,
  folders,
  onSubmit,
  submitting,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link: LinkButton | null;
  folders: Folder[];
  onSubmit: (input: LinkButtonInput) => void;
  submitting: boolean;
}) {
  const messages = useMessages();
  const [title, setTitle] = useState(link?.title ?? "");
  const [url, setUrl] = useState(link?.url ?? "");
  const [icon, setIcon] = useState(link?.icon ?? "link");
  const [folderId, setFolderId] = useState<string | null>(link?.folderId ?? null);
  const [active, setActive] = useState(link?.active ?? true);
  const [showIconPicker, setShowIconPicker] = useState(false);

  const SelectedIcon = getIconOption(icon).icon;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={link ? "Editar link" : messages.linkEditor.addLink}
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            {messages.linkEditor.titleLabel}
          </label>
          <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Meu Instagram" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            {messages.linkEditor.urlLabel}
          </label>
          <Input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://instagram.com/seuusuario"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            {messages.linkEditor.iconLabel}
          </label>
          <button
            type="button"
            onClick={() => setShowIconPicker((value) => !value)}
            className="flex w-full items-center gap-3 rounded-xl border border-zinc-200 px-4 py-3 text-left hover:bg-zinc-50"
          >
            <SelectedIcon size={20} className="text-violet-600" />
            <span className="text-sm font-medium text-zinc-700">{getIconOption(icon).label}</span>
          </button>
          {showIconPicker ? (
            <div className="mt-2">
              <IconPicker
                value={icon}
                onChange={(next) => {
                  setIcon(next);
                  setShowIconPicker(false);
                }}
              />
            </div>
          ) : null}
        </div>

        {folders.length > 0 ? (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              {messages.linkEditor.placementLabel}
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFolderId(null)}
                className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium ${folderId === null ? "border-violet-500 bg-violet-50 text-violet-700" : "border-zinc-200 text-zinc-600"}`}
              >
                {messages.linkEditor.placementMain}
              </button>
              <button
                type="button"
                onClick={() => setFolderId(folders[0]!.id)}
                className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium ${folderId !== null ? "border-violet-500 bg-violet-50 text-violet-700" : "border-zinc-200 text-zinc-600"}`}
              >
                {messages.linkEditor.placementFolder}
              </button>
            </div>
          </div>
        ) : null}

        <div className="flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-3">
          <span className="text-sm font-medium text-zinc-700">
            {active ? messages.common.active : messages.common.inactive}
          </span>
          <Switch checked={active} onCheckedChange={setActive} />
        </div>

        <Button
          size="lg"
          disabled={!title || !url || submitting}
          onClick={() => onSubmit({ title, url, icon, folderId, active })}
        >
          {submitting ? "Salvando..." : messages.common.save}
        </Button>
      </div>
    </Dialog>
  );
}
