import { motion } from 'framer-motion';

const links = [
  { href: '#about', label: '关于' },
  { href: '#projects', label: '项目' },
  { href: '#contact', label: '联系' },
];

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 z-50 w-full border-b border-white/5 bg-ink-900/70 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm tracking-widest">
          <span className="inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(0,229,255,0.7)]" />
          <span className="text-white">LIU<span className="text-accent">.</span>XIN</span>
        </a>
        <ul className="hidden items-center gap-8 text-sm text-zinc-400 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative transition-colors duration-200 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
