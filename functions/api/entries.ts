import { jsonResponse, requireAuth } from '../_lib/auth';
import { insertEntry, listByModule } from '../_lib/db';
import type { Env } from '../_lib/types';

const MODULE_RE = /^[a-z][a-z0-9_-]{0,31}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const auth = await requireAuth(request, env.JWT_SECRET);
  if (auth instanceof Response) return auth;

  const url = new URL(request.url);
  const module = url.searchParams.get('module') ?? '';
  if (!MODULE_RE.test(module)) {
    return jsonResponse({ error: 'invalid_module' }, 400);
  }

  const entries = await listByModule(env.DB, module);
  return jsonResponse({ entries });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const auth = await requireAuth(request, env.JWT_SECRET);
  if (auth instanceof Response) return auth;

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonResponse({ error: 'invalid_body' }, 400);
  }

  const module = typeof body.module === 'string' ? body.module : '';
  const text = typeof body.text === 'string' ? body.text.trim() : '';
  const date = typeof body.date === 'string' ? body.date : '';
  const time = typeof body.time === 'string' ? body.time : '';

  if (!MODULE_RE.test(module)) return jsonResponse({ error: 'invalid_module' }, 400);
  if (!text) return jsonResponse({ error: 'empty_text' }, 400);
  if (text.length > 4000) return jsonResponse({ error: 'text_too_long' }, 400);
  if (!DATE_RE.test(date)) return jsonResponse({ error: 'invalid_date' }, 400);
  if (!TIME_RE.test(time)) return jsonResponse({ error: 'invalid_time' }, 400);

  const emoji = typeof body.emoji === 'string' && body.emoji ? body.emoji : undefined;
  const tags = Array.isArray(body.tags)
    ? body.tags.filter((t): t is string => typeof t === 'string').slice(0, 16)
    : undefined;

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const createdAt = Date.now();

  await insertEntry(env.DB, { id, module, date, time, text, emoji, tags, createdAt });

  return jsonResponse(
    { entry: { id, module, date, time, text, emoji, tags, createdAt } },
    201,
  );
};
