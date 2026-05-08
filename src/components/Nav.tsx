import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, LogOut, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import LoginModal from './LoginModal';

const baseLinks = [
  { to: '/#about', label: '关于' },
  { to: '/#projects', label: '项目' },
  { to: '/#contact', label: '联系' },
];

const moodLink = { to: '/mood', label: '心情' };

export default function Nav() {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const [loginOpen, setLoginOpen] = useState(false);
  const location = useLocation();

  const links = isAuthenticated ? [...baseLinks, moodLink] : baseLinks;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 z-50 w-full border-b border-white/5 bg-ink-900/70 backdrop-blur-md"
      >
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 font-mono text-sm tracking-widest">
            <span className="inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--color-accent)/0.7)]" />
            <span className="text-white">LIU<span className="text-accent">.</span>XIN</span>
          </Link>

          <div className="flex items-center gap-6">
            <ul className="hidden items-center gap-8 text-sm text-zinc-400 sm:flex">
              {links.map((l) => {
                const isMoodActive = l.to === '/mood' && location.pathname === '/mood';
                return (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className={`relative transition-colors duration-200 hover:text-white ${
                        l.to === '/mood' ? 'text-accent' : ''
                      } ${isMoodActive ? 'after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-px after:bg-accent' : ''}`}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-zinc-400 transition-all hover:border-accent/40 hover:text-accent"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -45, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 45, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="hidden font-mono text-[11px] uppercase tracking-widest text-zinc-500 sm:inline">
                  {user}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-white/30 hover:text-white"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  退出
                </button>
              </div>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent-soft px-3 py-1.5 text-xs text-accent transition-all hover:bg-accent hover:text-ink-900"
              >
                <LogIn className="h-3.5 w-3.5" />
                登录
              </button>
            )}
          </div>
        </nav>
      </motion.header>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
