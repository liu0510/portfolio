import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 sm:flex-row">
        <span>© {new Date().getFullYear()} {profile.nameEn}</span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          built with react · vite · tailwind
        </span>
      </div>
    </footer>
  );
}
