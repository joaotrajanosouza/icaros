// Wrapper fino sobre SubtleCrypto. Nunca implementamos primitivas de
// criptografia do zero — só orquestramos AES-GCM/HMAC nativos do browser.
// TLS é sempre pressuposto; isto é uma camada extra de defesa em
// profundidade para campos sensíveis do corpo da requisição, não substituto
// de HTTPS.

let sessionKey: CryptoKey | null = null;

async function getOrCreateSessionKey(): Promise<CryptoKey> {
  if (sessionKey) return sessionKey;
  sessionKey = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, false, [
    "encrypt",
    "decrypt",
  ]);
  return sessionKey;
}

// Chama isso no logout/expiração de sessão: a chave nunca é reaproveitada
// entre sessões de usuários diferentes.
export function rotateSessionKey(): void {
  sessionKey = null;
}

export async function encryptPayload(plainText: string): Promise<{ iv: string; data: string }> {
  const key = await getOrCreateSessionKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plainText);
  const cipherBuffer = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
  return {
    iv: bufferToBase64(iv.buffer),
    data: bufferToBase64(cipherBuffer),
  };
}

export async function decryptPayload(iv: string, data: string): Promise<string> {
  const key = await getOrCreateSessionKey();
  const ivBuffer = base64ToBuffer(iv);
  const dataBuffer = base64ToBuffer(data);
  const plainBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(ivBuffer) },
    key,
    dataBuffer,
  );
  return new TextDecoder().decode(plainBuffer);
}

export async function signPayload(rawBody: string, hmacKey: CryptoKey): Promise<string> {
  const encoded = new TextEncoder().encode(rawBody);
  const signature = await crypto.subtle.sign("HMAC", hmacKey, encoded);
  return bufferToBase64(signature);
}

function bufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToBuffer(base64: string): ArrayBuffer {
  return Uint8Array.from(atob(base64), (char) => char.charCodeAt(0)).buffer;
}
