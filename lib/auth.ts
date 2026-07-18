const COOKIE_NAME = "hayaz_admin";
const MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

function b64urlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(str: string): Uint8Array {
  const pad = (4 - (str.length % 4)) % 4;
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmac(secret: string, data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return new Uint8Array(sig);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

export const ADMIN_COOKIE = COOKIE_NAME;
export const SESSION_MAX_AGE = MAX_AGE_SEC;

export async function createSessionToken(secret: string): Promise<string> {
  const payload = b64urlEncode(
    new TextEncoder().encode(JSON.stringify({ exp: Date.now() + MAX_AGE_SEC * 1000 })),
  );
  const sig = b64urlEncode(await hmac(secret, payload));
  return payload + "." + sig;
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token || !secret) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expected = b64urlEncode(await hmac(secret, payload));
  if (!timingSafeEqual(sig, expected)) return false;
  try {
    const data = JSON.parse(new TextDecoder().decode(b64urlDecode(payload))) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}
