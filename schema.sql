-- D1 数据库初始化脚本
-- 通用 entries 表：心情、洞察、灵感等所有模块共用
-- 加新模块时只需用不同的 module 值，不需要改表结构

CREATE TABLE IF NOT EXISTS entries (
  id          TEXT PRIMARY KEY,
  module      TEXT NOT NULL,
  date        TEXT NOT NULL,
  time        TEXT NOT NULL,
  text        TEXT NOT NULL,
  emoji       TEXT,
  tags        TEXT,
  created_at  INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_entries_module_date
  ON entries(module, date DESC, created_at DESC);
