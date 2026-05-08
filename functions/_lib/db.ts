// D1 操作封装。所有模块共用 entries 表，通过 module 字段区分。

export type EntryRow = {
  id: string;
  module: string;
  date: string;
  time: string;
  text: string;
  emoji: string | null;
  tags: string | null;
  created_at: number;
};

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

export function rowToEntry(r: EntryRow): Entry {
  return {
    id: r.id,
    module: r.module,
    date: r.date,
    time: r.time,
    text: r.text,
    emoji: r.emoji ?? undefined,
    tags: r.tags ? (JSON.parse(r.tags) as string[]) : undefined,
    createdAt: r.created_at,
  };
}

export async function listByModule(db: D1Database, module: string): Promise<Entry[]> {
  const result = await db
    .prepare(
      'SELECT id, module, date, time, text, emoji, tags, created_at FROM entries WHERE module = ? ORDER BY date DESC, created_at DESC',
    )
    .bind(module)
    .all<EntryRow>();
  return (result.results ?? []).map(rowToEntry);
}

export async function insertEntry(
  db: D1Database,
  e: { id: string; module: string; date: string; time: string; text: string; emoji?: string; tags?: string[]; createdAt: number },
): Promise<void> {
  await db
    .prepare(
      'INSERT INTO entries (id, module, date, time, text, emoji, tags, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    )
    .bind(
      e.id,
      e.module,
      e.date,
      e.time,
      e.text,
      e.emoji ?? null,
      e.tags && e.tags.length ? JSON.stringify(e.tags) : null,
      e.createdAt,
    )
    .run();
}

export async function deleteEntry(db: D1Database, id: string): Promise<boolean> {
  const result = await db.prepare('DELETE FROM entries WHERE id = ?').bind(id).run();
  return Boolean(result.meta.changes && result.meta.changes > 0);
}
