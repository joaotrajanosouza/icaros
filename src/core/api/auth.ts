import { defineApiRoute, httpResource } from "@core/http-resource";
import type { SessionUser } from "@core/session-store";

export async function fetchCurrentUser(): Promise<SessionUser | null> {
  return httpResource(
    defineApiRoute<SessionUser | null>({ method: "GET", path: "/api/auth/me" }),
  );
}

export async function loginWithGoogle(idToken: string): Promise<SessionUser> {
  return httpResource(
    defineApiRoute<SessionUser>({ method: "POST", path: "/api/auth/google", sensitive: true }),
    { body: { idToken } },
  );
}

export async function logout(): Promise<void> {
  await httpResource(defineApiRoute<void>({ method: "POST", path: "/api/auth/logout" }));
}
