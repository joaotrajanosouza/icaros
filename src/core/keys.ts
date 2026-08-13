import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const queryKeys = createQueryKeyStore({
  auth: {
    me: null,
  },
  page: {
    mine: null,
    public: (username: string) => [username],
    usernameAvailable: (username: string) => [username],
  },
  links: {
    all: null,
  },
  folders: {
    all: null,
  },
  themes: {
    all: null,
  },
  stats: {
    overview: null,
    linkClicks: null,
  },
  subscription: {
    mine: null,
  },
});
