import { createContext, useContext } from "react";
import { ptBR, type Messages } from "@core/locales/pt-BR";

const catalogs = { "pt-BR": ptBR } satisfies Record<string, Messages>;

export type Locale = keyof typeof catalogs;

export const I18nContext = createContext<Messages>(ptBR);

export function useMessages(): Messages {
  return useContext(I18nContext);
}

export async function loadMessages(locale: Locale): Promise<Messages> {
  return catalogs[locale];
}
