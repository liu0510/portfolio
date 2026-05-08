import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { profile } from '../data/profile';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center overflow-hidden"
    >
      {/* 网格背景 */}
      <div className="grid-bg absolute inset-0 -z-10 opacity-50" aria-hidden />

      {/* 渐变光斑 */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgb(var(--color-accent) / 0.35) 0%, rgb(var(--color-accent) / 0) 70%)',
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-24">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* 状态标签 */}
          <motion.div variants={item} className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span>Available for collaboration</span>
          </motion.div>

          {/* 大名 */}
          <motion.h1
            variants={item}
            className="font-display text-[14vw] font-black leading-[0.9] tracking-tight sm:text-[12vw] md:text-[10vw] lg:text-[9rem]"
          >
            <span className="text-gradient glow-text">{profile.name}</span>
          </motion.h1>

          {/* 英文小字 */}
          <motion.p
            variants={item}
            className="mt-2 font-mono text-sm tracking-[0.3em] text-zinc-500 md:text-base"
          >
            / {profile.nameEn.toUpperCase()}
          </motion.p>

          {/* 副标题 - 双身份 */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xl text-zinc-300 md:text-2xl"
          >
            {profile.titles.map((t, i) => (
              <span key={t} className="flex items-center gap-4">
                {i > 0 && <span className="text-accent">×</span>}
                <span>{t}</span>
              </span>
            ))}
          </motion.div>

          {/* slogan */}
          <motion.p
            variants={item}
            className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg"
          >
            {profile.slogan}
          </motion.p>

          {/* 装饰横线 */}
          <motion.div
            variants={item}
            className="mt-14 flex items-center gap-4"
          >
            <div className="h-px w-32 bg-gradient-to-r from-accent to-transparent" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
              scroll to explore
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* 滚动提示 */}
      <motion.a
        href="#about"
        aria-label="向下滚动"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500 transition-colors hover:text-accent"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}
