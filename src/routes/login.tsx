import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "@layouts/auth-layout";
import { Button } from "@ui/button";
import { useAuth } from "@core/auth-context";
import { useMessages } from "@core/i18n";
import { APP_NAME } from "@core/constants";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const messages = useMessages();
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleLogin() {
    await loginWithGoogle();
    await navigate({ to: "/app/linktree" });
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="text-3xl font-black text-violet-600">{APP_NAME}</p>
        <div>
          <h1 className="text-xl font-bold text-zinc-900">{messages.auth.loginTitle}</h1>
          <p className="mt-1 text-sm text-zinc-500">{messages.auth.loginSubtitle}</p>
        </div>
        <Button size="lg" className="w-full" onClick={handleLogin}>
          {messages.auth.loginWithGoogle}
        </Button>
      </div>
    </AuthLayout>
  );
}
