import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function LoginModal({ open, onClose }: Props) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const userRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setError(null);
      setTimeout(() => userRef.current?.focus(), 50);
    } else {
      setUsername('');
      setPassword('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(username.trim(), password);
    if (!result.ok) {
      setError(result.error ?? '登录失败');
      return;
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-ink-900/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="登录"
            initial={{ y: 16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 8, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-ink-800/90 p-7 shadow-[0_30px_80px_-20px_rgb(var(--color-accent)/0.25)]"
          >
            <button
              onClick={onClose}
              aria-label="关闭"
              className="absolute right-4 top-4 rounded-md p-1 text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <LogIn className="h-4 w-4" />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold text-white">管理员登录</h2>
                <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  admin only
                </p>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="mb-1 block font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  账号
                </label>
                <input
                  ref={userRef}
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-ink-900/60 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent/60"
                  placeholder="admin"
                />
              </div>
              <div>
                <label className="mb-1 block font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  密码
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-ink-900/60 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent/60"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-ink-900 transition-all hover:shadow-[0_0_24px_rgb(var(--color-accent)/0.5)]"
              >
                登录
                <LogIn className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
