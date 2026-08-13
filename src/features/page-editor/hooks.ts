import { useMutation, useQueryClient } from "@tanstack/react-query";
import { linksQuery } from "@core/queries";
import {
  createLink,
  updateLink,
  deleteLink,
  reorderLinks,
  type LinkButton,
  type LinkButtonInput,
} from "@core/api/links";
import { toast } from "@ui/toaster";

export function useLinkMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: linksQuery.queryKey });

  const create = useMutation({
    mutationFn: (input: LinkButtonInput) => createLink(input),
    onSuccess: () => {
      invalidate();
      toast("Link adicionado.");
    },
  });

  const update = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<LinkButtonInput> }) =>
      updateLink(id, input),
    onSuccess: () => {
      invalidate();
      toast("Link atualizado.");
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteLink(id),
    onSuccess: () => {
      invalidate();
      toast("Link excluído.");
    },
  });

  const reorder = useMutation({
    mutationFn: (orderedIds: string[]) => reorderLinks(orderedIds),
    onMutate: async (orderedIds) => {
      await queryClient.cancelQueries({ queryKey: linksQuery.queryKey });
      const previous = queryClient.getQueryData<LinkButton[]>(linksQuery.queryKey);
      if (previous) {
        const byId = new Map(previous.map((link) => [link.id, link]));
        const optimistic = orderedIds
          .map((id, index) => {
            const link = byId.get(id);
            return link ? { ...link, order: index } : null;
          })
          .filter((link): link is LinkButton => link !== null);
        queryClient.setQueryData(linksQuery.queryKey, optimistic);
      }
      return { previous };
    },
    onError: (_error, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(linksQuery.queryKey, context.previous);
    },
    onSettled: invalidate,
  });

  return { create, update, remove, reorder };
}
