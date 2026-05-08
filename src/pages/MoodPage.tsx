import { motion, AnimatePresence } from 'framer-motion';
import { Send, Trash2, Tag as TagIcon, Smile } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'liuxin.moods';

const EMOJI_PRESETS = ['😀', '😌', '🤔', '😔', '😡', '🎉', '💪', '🚀', '☕', '🌙', '🍃', '❤️'];
const TAG_PRESETS = ['工作', '生活', '学习', '运动', '灵感', '吐槽'];
const CATEGORY_TABS = ['ALL', ...TAG_PRESETS];

type MoodEntry = {
  id: string;
  time: string;
  text: string;
  emoji?: string;
  tags?: string[];
};

type MoodStore = Record<string, MoodEntry[]>;

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function nowTime(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function loadStore(): MoodStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as MoodStore) : {};
  } catch {
    return {};
  }
}

function saveStore(store: MoodStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore
  }
}

export default function MoodPage() {
  const [store, setStore] = useState<MoodStore>({});
  const [text, setText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [pendingDelete, setPendingDelete] = useState<{ date: string; id: string } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setStore(loadStore());
  }, []);

  const totalCount = useMemo(
    () => Object.values(store).reduce((acc, arr) => acc + arr.length, 0),
    [store],
  );

  const filteredStore = useMemo(() => {
    if (activeCategory === 'ALL') return store;
    const next: MoodStore = {};
    for (const [date, list] of Object.entries(store)) {
      const matched = list.filter((m) => m.tags?.includes(activeCategory));
      if (matched.length) next[date] = matched;
    }
    return next;
  }, [store, activeCategory]);

  const sortedDates = useMemo(
    () => Object.keys(filteredStore).sort((a, b) => (a < b ? 1 : -1)),
    [filteredStore],
  );

  const filteredCount = useMemo(
    () => Object.values(filteredStore).reduce((acc, arr) => acc + arr.length, 0),
    [filteredStore],
  );

  const insertEmoji = (e: string) => {
    const ta = textareaRef.current;
    if (!ta) {
      setText((prev) => prev + e);
      return;
    }
    const start = ta.selectionStart ?? text.length;
    const end = ta.selectionEnd ?? text.length;
    const next = text.slice(0, start) + e + text.slice(end);
    setText(next);
    requestAnimationFrame(() => {
      ta.focus();
      const pos = start + e.length;
      ta.setSelectionRange(pos, pos);
    });
  };

  const toggleTag = (tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const date = todayKey();
    const entry: MoodEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      time: nowTime(),
      text: trimmed,
      tags: tags.length ? [...tags] : undefined,
    };
    setStore((prev) => {
      const next = { ...prev, [date]: [entry, ...(prev[date] ?? [])] };
      saveStore(next);
      return next;
    });
    setText('');
    setTags([]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      submit();
    }
  };

  const remove = (date: string, id: string) => {
    setStore((prev) => {
      const list = (prev[date] ?? []).filter((m) => m.id !== id);
      const next = { ...prev };
      if (list.length) next[date] = list;
      else delete next[date];
      saveStore(next);
      return next;
    });
    setPendingDelete(null);
  };

  return (
    <section className="relative min-h-screen pt-32 pb-24">
      <div className="grid-bg absolute inset-0 -z-10 opacity-30" aria-hidden />
      <div
        aria-hidden
        className="absolute -top-20 right-0 -z-10 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgb(var(--color-accent) / 0.25) 0%, rgb(var(--color-accent) / 0) 70%)',
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        {/* 面包屑 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500"
        >
          <Link to="/" className="transition-colors hover:text-accent">
            HOME
          </Link>
          <span className="mx-3 text-zinc-700">/</span>
          <span className="text-accent">DAILY MOOD</span>
        </motion.div>

        {/* 头部：标签 + 大标题 + 描述 */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="lg:col-span-7"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
              — DAILY · MOOD —
            </p>
            <h1 className="mt-6 font-display text-6xl font-bold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-[7rem]">
              随时{' '}
              <span className="italic text-gradient glow-text">心情。</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-end lg:col-span-5"
          >
            <p className="text-base leading-relaxed text-zinc-400 md:text-lg">
              此刻在想什么，就写下来。<br />
              用表情和标签留住每一帧情绪，按日期归档，可随时回看与删除。
            </p>
          </motion.div>
        </div>

        {/* 分类筛选 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
            — CATEGORIES —
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 border-b border-white/10 pb-3">
            {CATEGORY_TABS.map((c) => {
              const active = activeCategory === c;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`relative pb-2 text-sm transition-colors ${
                    active ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {c === 'ALL' ? <span className="font-mono">ALL</span> : c}
                  {active && (
                    <motion.span
                      layoutId="cat-underline"
                      className="absolute -bottom-[13px] left-0 right-0 h-px bg-accent"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 输入区 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 rounded-2xl border border-white/10 bg-ink-800/40 p-6 backdrop-blur-sm"
        >
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="此刻在想什么…（Ctrl/Cmd + Enter 快速记录）"
            rows={3}
            className="w-full resize-none rounded-lg border border-white/5 bg-ink-900/60 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent/50"
          />

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="flex items-start gap-2">
              <Smile className="mt-1.5 h-3.5 w-3.5 flex-none text-zinc-500" />
              <div className="flex flex-wrap gap-1.5">
                {EMOJI_PRESETS.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onMouseDown={(ev) => ev.preventDefault()}
                    onClick={() => insertEmoji(e)}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-white/5 bg-ink-900/40 text-sm transition-all hover:scale-110 hover:border-accent/50 hover:bg-accent-soft"
                    aria-label={`插入表情 ${e}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2">
              <TagIcon className="mt-1.5 h-3.5 w-3.5 flex-none text-zinc-500" />
              <div className="flex flex-wrap gap-1.5">
                {TAG_PRESETS.map((t) => {
                  const active = tags.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleTag(t)}
                      className={`rounded-md border px-2 py-0.5 text-xs transition-all ${
                        active
                          ? 'border-accent bg-accent-soft text-accent'
                          : 'border-white/5 bg-ink-900/40 text-zinc-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
              {activeCategory === 'ALL'
                ? `共 ${totalCount} 条 · ${Object.keys(store).length} 天`
                : `#${activeCategory} · ${filteredCount} 条`}
            </span>
            <button
              onClick={submit}
              disabled={!text.trim()}
              className="group flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-ink-900 transition-all enabled:hover:shadow-[0_0_24px_rgb(var(--color-accent)/0.5)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              记录
              <Send className="h-3.5 w-3.5 transition-transform group-enabled:group-hover:translate-x-0.5" />
            </button>
          </div>
        </motion.div>

        {/* 列表 */}
        <div className="mt-14 space-y-12">
          {sortedDates.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 py-24 text-center text-zinc-500">
              {activeCategory === 'ALL'
                ? '还没有记录，写下第一条心情吧 ✨'
                : `还没有「${activeCategory}」分类下的记录`}
            </div>
          ) : (
            sortedDates.map((date) => (
              <div key={date}>
                <div className="mb-4 flex items-baseline gap-3">
                  <h3 className="font-mono text-sm tracking-widest text-accent">{date}</h3>
                  <span className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
                  <span className="font-mono text-[11px] text-zinc-500">
                    {filteredStore[date].length} 条
                  </span>
                </div>

                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {filteredStore[date].map((m) => {
                      const isPending = pendingDelete?.date === date && pendingDelete?.id === m.id;
                      return (
                        <motion.li
                          key={m.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.25 }}
                          className="group flex items-start gap-4 rounded-xl border border-white/5 bg-ink-800/30 p-4 transition-colors hover:border-white/15"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent/60" />
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center gap-2 font-mono text-[11px] text-zinc-500">
                              <span>{m.time}</span>
                              {m.tags?.map((t) => (
                                <span
                                  key={t}
                                  className="rounded bg-accent-soft px-1.5 py-0.5 text-accent"
                                >
                                  #{t}
                                </span>
                              ))}
                            </div>
                            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-zinc-200">
                              {m.emoji ? `${m.emoji} ` : ''}
                              {m.text}
                            </p>
                          </div>
                          <div className="flex flex-none items-center gap-2">
                            {isPending ? (
                              <>
                                <button
                                  onClick={() => remove(date, m.id)}
                                  className="rounded-md border border-red-500/40 bg-red-500/10 px-2 py-1 text-xs text-red-300 hover:bg-red-500/20"
                                >
                                  确认删除
                                </button>
                                <button
                                  onClick={() => setPendingDelete(null)}
                                  className="rounded-md border border-white/10 px-2 py-1 text-xs text-zinc-400 hover:text-white"
                                >
                                  取消
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => setPendingDelete({ date, id: m.id })}
                                aria-label="删除"
                                className="rounded-md p-1.5 text-zinc-500 opacity-0 transition-all hover:bg-red-500/10 hover:text-red-300 group-hover:opacity-100"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
