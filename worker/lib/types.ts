export interface Env {
  DB: D1Database;
  ADMIN_USER: string;
  ADMIN_PASS: string;
  JWT_SECRET: string;
}

export interface WorkerEnv extends Env {
  ASSETS: Fetcher;
}
