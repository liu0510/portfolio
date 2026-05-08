import { jsonResponse } from './lib/auth';
import { handleLogin } from './handlers/login';
import { handleEntries, handleEntryById } from './handlers/entries';
import type { WorkerEnv } from './lib/types';

const ENTRY_BY_ID_RE = /^\/api\/entries\/([^/]+)$/;

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/api/login') return handleLogin(request, env);
    if (path === '/api/entries') return handleEntries(request, env);

    const m = ENTRY_BY_ID_RE.exec(path);
    if (m) return handleEntryById(request, env, decodeURIComponent(m[1]));

    if (path.startsWith('/api/')) {
      return jsonResponse({ error: 'not_found' }, 404);
    }

    // 非 API 请求理论上不会进 Worker（run_worker_first 限定了 /api/*），
    // 但保险起见 fallback 到静态资产。
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<WorkerEnv>;
