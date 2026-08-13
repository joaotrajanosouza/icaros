import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@ui/input";
import { cx } from "@ui/variants";
import { iconCatalog } from "@pattern/icon-catalog";

export function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (iconId: string) => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = iconCatalog.filter((option) =>
    option.label.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <div>
      <div className="relative mb-3">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar ícone..."
          className="pl-9"
        />
      </div>
      <div className="grid max-h-56 grid-cols-5 gap-2 overflow-y-auto pr-1 sm:grid-cols-6">
        {filtered.map((option) => {
          const Icon = option.icon;
          const selected = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              title={option.label}
              onClick={() => onChange(option.id)}
              className={cx(
                "flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border p-2 transition-colors",
                selected
                  ? "border-violet-500 bg-violet-50 text-violet-700"
                  : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50",
              )}
            >
              <Icon size={20} />
            </button>
          );
        })}
        {filtered.length === 0 ? (
          <p className="col-span-full py-4 text-center text-sm text-zinc-400">
            Nenhum ícone encontrado.
          </p>
        ) : null}
      </div>
    </div>
  );
}
