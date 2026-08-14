import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera, UserRound } from "lucide-react";
import { myPageQuery } from "@core/queries";
import { updateMyPage } from "@core/api/pages";
import { Header } from "@ui/header";
import { Avatar, AvatarImage, AvatarFallback } from "@ui/avatar";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import { Button } from "@ui/button";
import { Label } from "@ui/label";
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
        <Skeleton className="h-36" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Header title={messages.dashboard.myPage} />

      {/* Avatar card */}
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-zinc-200 bg-white p-6">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={page.avatarUrl ?? undefined} alt={page.displayName} />
            <AvatarFallback><UserRound className="size-10 text-muted-foreground" /></AvatarFallback>
          </Avatar>
          <button
            type="button"
            aria-label="Alterar foto"
            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-zinc-900 text-white shadow-md transition-colors hover:bg-zinc-700"
          >
            <Camera size={14} />
          </button>
        </div>
        <p className="text-sm font-medium text-zinc-500">Foto de perfil</p>
      </div>

      {/* Form card */}
      <div className="flex flex-col gap-5 rounded-3xl border border-zinc-200 bg-white p-5">
        <div>
          <Label htmlFor="display-name">Nome público</Label>
          <Input
            id="display-name"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Seu nome ou apelido"
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio curta</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            maxLength={150}
            rows={3}
            placeholder="Uma frase sobre você..."
          />
          <p className="mt-1.5 text-right text-xs text-zinc-400">
            {bio.length}/150
          </p>
        </div>

        <Button
          size="lg"
          disabled={save.isPending}
          onClick={() => save.mutate()}
        >
          {save.isPending ? "Salvando..." : messages.common.save}
        </Button>
      </div>
    </div>
  );
}
