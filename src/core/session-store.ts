import { create } from "zustand";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  planId: "free" | "paid";
};

type SessionState = {
  user: SessionUser | null;
  isAuthenticated: boolean;
  setUser: (user: SessionUser | null) => void;
  clear: () => void;
};

// Sessão fica só em memória (nunca em localStorage/sessionStorage em texto
// plano). O token real de acesso é tratado via cookie httpOnly emitido pelo
// backend; aqui guardamos só o perfil já resolvido.
export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: user !== null }),
  clear: () => set({ user: null, isAuthenticated: false }),
}));
