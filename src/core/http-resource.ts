import { encryptPayload } from "@core/security/crypto";
import { useAppStore } from "@core/app-store";

export type FriendlyError = {
  title: string;
  detail: string;
  status: number;
};

type ApiRouteConfig<TResponse> = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  sensitive?: boolean;
  parse?: (raw: unknown) => TResponse;
};

export function defineApiRoute<TResponse>(config: ApiRouteConfig<TResponse>) {
  return config;
}

export function defineApiRouteFn<TArgs extends unknown[], TResponse>(
  fn: (...args: TArgs) => ApiRouteConfig<TResponse>,
) {
  return fn;
}

async function toFriendlyError(response: Response): Promise<FriendlyError> {
  const isProblemJson = response.headers.get("content-type")?.includes("application/problem+json");
  if (isProblemJson) {
    const body = (await response.json()) as { title?: string; detail?: string };
    return {
      title: body.title ?? "Algo deu errado",
      detail: body.detail ?? "Tenta novamente em instantes.",
      status: response.status,
    };
  }
  return {
    title: "Algo deu errado",
    detail: "Não conseguimos completar essa ação agora.",
    status: response.status,
  };
}

export async function httpResource<TResponse>(
  config: ApiRouteConfig<TResponse>,
  options?: { body?: unknown; signal?: AbortSignal },
): Promise<TResponse> {
  const locale = useAppStore.getState().locale;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": locale,
  };

  let body: string | undefined;
  if (options?.body !== undefined) {
    const rawBody = JSON.stringify(options.body);
    if (config.sensitive) {
      const encrypted = await encryptPayload(rawBody);
      body = JSON.stringify(encrypted);
      headers["X-Payload-Encrypted"] = "aes-gcm";
    } else {
      body = rawBody;
    }
  }

  let response: Response;
  try {
    response = await fetch(config.path, {
      method: config.method,
      headers,
      credentials: "include",
      ...(body !== undefined && { body }),
      ...(options?.signal !== undefined && { signal: options.signal }),
    });
  } catch {
    throw {
      title: "Sem conexão",
      detail: "Verifique sua internet e tente novamente.",
      status: 0,
    } satisfies FriendlyError;
  }

  if (!response.ok) {
    throw await toFriendlyError(response);
  }

  const raw = (await response.json()) as unknown;
  return config.parse ? config.parse(raw) : (raw as TResponse);
}

export async function httpUpload<TResponse>(
  path: string,
  file: File,
  options?: { signal?: AbortSignal },
): Promise<TResponse> {
  const form = new FormData();
  form.append("file", file);
  const response = await fetch(path, {
    method: "POST",
    body: form,
    credentials: "include",
    ...(options?.signal !== undefined && { signal: options.signal }),
  });
  if (!response.ok) throw await toFriendlyError(response);
  return (await response.json()) as TResponse;
}
