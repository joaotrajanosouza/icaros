import { useMutation, useQueryClient } from "@tanstack/react-query";
import { foldersQuery, linksQuery } from "@core/queries";
import { createFolder, updateFolder, deleteFolder } from "@core/api/folders";
import { toast } from "@ui/toaster";

export function useFolderMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: foldersQuery.queryKey });

  const create = useMutation({
    mutationFn: (name: string) => createFolder({ name }),
    onSuccess: () => {
      invalidate();
      toast("Subpasta criada.");
    },
  });

  const rename = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => updateFolder(id, { name }),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteFolder(id),
    onSuccess: () => {
      invalidate();
      queryClient.invalidateQueries({ queryKey: linksQuery.queryKey });
      toast("Subpasta excluída.");
    },
  });

  return { create, rename, remove };
}
