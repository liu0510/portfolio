// HMAC-SHA256 签名的轻量 token：payload_b64url.signature_b64url
// payload 是 JSON.stringify({ user, exp })。Worker Web Crypto API 实现。

export type TokenPayload = { user: string; exp: number };

const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;

function b64urlEncode(input: ArrayBuffer | string): string {
  const bytes =
    typeof input === 'string' ? new TextEncoder().encode(input) : new Uint8Array(input);
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(s: string): string {
  let t = s.replace(/-/g, '+').replace(/_/g, '/');
  while (t.length % 4) t += '=';
  return atob(t);
}

async function hmacSign(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return b64urlEncode(sig);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function signToken(user: string, secret: string): Promise<{ token: string; exp: number }> {
  const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS;
  const payload = JSON.stringify({ user, exp });
  const payloadB64 = b64urlEncode(payload);
  const sig = await hmacSign(secret, payloadB64);
  return { token: `${payloadB64}.${sig}`, exp };
}

export async function verifyToken(token: string, secret: string): Promise<TokenPayload | null> {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payloadB64, sig] = parts;
  const expectedSig = await hmacSign(secret, payloadB64);
  if (!timingSafeEqual(sig, expectedSig)) return null;
  try {
    const payload = JSON.parse(b64urlDecode(payloadB64)) as TokenPayload;
    if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function requireAuth(
  request: Request,
  secret: string,
): Promise<TokenPayload | Response> {
  const header = request.headers.get('Authorization') ?? '';
  const m = /^Bearer\s+(.+)$/i.exec(header);
  if (!m) return jsonResponse({ error: 'unauthorized' }, 401);
  const payload = await verifyToken(m[1], secret);
  if (!payload) return jsonResponse({ error: 'invalid_or_expired_token' }, 401);
  return payload;
}

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
