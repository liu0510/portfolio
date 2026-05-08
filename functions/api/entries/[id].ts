import { jsonResponse, requireAuth } from '../../_lib/auth';
import { deleteEntry } from '../../_lib/db';
import type { Env } from '../../_lib/types';

export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  const auth = await requireAuth(request, env.JWT_SECRET);
  if (auth instanceof Response) return auth;

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  if (typeof id !== 'string' || !id) {
    return jsonResponse({ error: 'invalid_id' }, 400);
  }

  const deleted = await deleteEntry(env.DB, id);
  if (!deleted) return jsonResponse({ error: 'not_found' }, 404);

  return jsonResponse({ ok: true });
};
