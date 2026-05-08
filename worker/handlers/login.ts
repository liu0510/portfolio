import { jsonResponse, signToken } from '../lib/auth';
import type { Env } from '../lib/types';

export async function handleLogin(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405);
  }

  let body: { username?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_body' }, 400);
  }

  const username = typeof body.username === 'string' ? body.username : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!username || !password) {
    return jsonResponse({ error: 'missing_fields' }, 400);
  }

  if (!env.ADMIN_USER || !env.ADMIN_PASS || !env.JWT_SECRET) {
    return jsonResponse({ error: 'server_not_configured' }, 500);
  }

  if (username !== env.ADMIN_USER || password !== env.ADMIN_PASS) {
    return jsonResponse({ error: 'invalid_credentials' }, 401);
  }

  const { token, exp } = await signToken(username, env.JWT_SECRET);
  return jsonResponse({ token, exp, user: username });
}
