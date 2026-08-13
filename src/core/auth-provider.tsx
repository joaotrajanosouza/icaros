import { type ReactNode, useCallback, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { currentUserQuery } from "@core/queries";
import { loginWithGoogle as loginWithGoogleApi, logout as logoutApi } from "@core/api/auth";
import { useSessionStore } from "@core/session-store";
import { rotateSessionKey } from "@core/security/crypto";
import { AuthContext } from "@core/auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { user, setUser, clear } = useSessionStore();
  const { data, isLoading } = useQuery(currentUserQuery);

  useEffect(() => {
    if (data !== undefined) setUser(data);
  }, [data, setUser]);

  const loginWithGoogle = useCallback(async () => {
    // No fluxo real, o Google Identity Services devolve o idToken via
    // callback; aqui simulamos a troca com o backend.
    const idToken = "mock-google-id-token";
    const sessionUser = await loginWithGoogleApi(idToken);
    setUser(sessionUser);
    await queryClient.invalidateQueries({ queryKey: ["auth"] });
  }, [queryClient, setUser]);

  const logout = useCallback(async () => {
    await logoutApi();
    rotateSessionKey();
    clear();
    queryClient.clear();
  }, [clear, queryClient]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
