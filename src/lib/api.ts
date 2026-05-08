export type Entry = {
  id: string;
  module: string;
  date: string;
  time: string;
  text: string;
  emoji?: string;
  tags?: string[];
  createdAt: number;
};

const TOKEN_KEY = 'liuxin.auth.token';
const USER_KEY = 'liuxin.auth.user';

let onUnauthorized: (() => void) | null = null;

export function setOnUnauthorized(cb: (() => void) | null) {
  onUnauthorized = cb;
}

export function getToken(): string | null {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}

export function getStoredUser(): string | null {
  try { return localStorage.getItem(USER_KEY); } catch { return null; }
}

export function setAuth(token: string, user: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, user);
  } catch {
    // ignore
  }
}

export function clearAuth() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {
    // ignore
  }
}

export class ApiError extends Error {
  constructor(public status: number, public code: string, message?: string) {
    super(message ?? code);
    this.name = 'ApiError';
  }
}

async function readJson(res: Response): Promise<any> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(init.headers);
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(path, { ...init, headers });

  if (res.status === 401) {
    clearAuth();
    onUnauthorized?.();
    throw new ApiError(401, 'unauthorized', '会话已过期，请重新登录');
  }

  const body = await readJson(res);
  if (!res.ok) {
    const code = body?.error ?? `http_${res.status}`;
    throw new ApiError(res.status, String(code));
  }
  return body as T;
}

export async function apiLogin(username: string, password: string) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const body = await readJson(res);
  if (!res.ok) {
    const code = body?.error ?? `http_${res.status}`;
    throw new ApiError(res.status, String(code));
  }
  setAuth(body.token, body.user);
  return body as { token: string; exp: number; user: string };
}

export function apiListEntries(module: string): Promise<Entry[]> {
  return apiFetch<{ entries: Entry[] }>(
    `/api/entries?module=${encodeURIComponent(module)}`,
  ).then((r) => r.entries);
}

export function apiCreateEntry(input: {
  module: string;
  text: string;
  date: string;
  time: string;
  emoji?: string;
  tags?: string[];
}): Promise<Entry> {
  return apiFetch<{ entry: Entry }>('/api/entries', {
    method: 'POST',
    body: JSON.stringify(input),
  }).then((r) => r.entry);
}

export async function apiDeleteEntry(id: string): Promise<void> {
  await apiFetch<{ ok: true }>(`/api/entries/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}
