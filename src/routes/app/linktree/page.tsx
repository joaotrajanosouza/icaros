import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { myPageQuery } from "@core/queries";
import { updateMyPage } from "@core/api/pages";
import { Header } from "@ui/header";
import { Avatar } from "@ui/avatar";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import { Button } from "@ui/button";
import { Skeleton } from "@ui/loading";
import { toast } from "@ui/toaster";
import { useState, useEffect } from "react";
import { useMessages } from "@core/i18n";

export const Route = createFileRoute("/app/linktree/page")({
  component: MyPagePage,
});

function MyPagePage() {
  const messages = useMessages();
  const { data: page, isLoading } = useQuery(myPageQuery);
  const queryClient = useQueryClient();

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (page) {
      setDisplayName(page.displayName);
      setBio(page.bio);
    }
  }, [page]);

  const save = useMutation({
    mutationFn: () => updateMyPage({ displayName, bio }),
    onSuccess: (updated) => {
      queryClient.setQueryData(myPageQuery.queryKey, updated);
      toast("Página atualizada.");
    },
  });

  if (isLoading || !page) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Header title={messages.dashboard.myPage} />

      <div className="flex flex-col items-center gap-3 rounded-3xl border border-zinc-200 bg-white p-6">
        <Avatar src={page.avatarUrl} name={page.displayName} size={96} />
        <Button variant="secondary" size="sm">
          Alterar foto
        </Button>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Nome público</label>
          <Input value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Bio curta</label>
          <Textarea value={bio} onChange={(event) => setBio(event.target.value)} maxLength={150} />
        </div>
        <Button disabled={save.isPending} onClick={() => save.mutate()}>
          {save.isPending ? "Salvando..." : messages.common.save}
        </Button>
      </div>
    </div>
  );
}
