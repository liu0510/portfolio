import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { profile, skills } from '../data/profile';

export default function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader index="01" label="About" title="关于我" />

        <div className="grid gap-16 lg:grid-cols-5">
          {/* 左侧介绍 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <p className="text-lg leading-loose text-zinc-300 whitespace-pre-line">
              {profile.bio}
            </p>
            <div className="mt-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
              <span className="h-px w-10 bg-accent" />
              <span>focus area</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Smart Contract', 'DeFi', 'LLM Agent', 'MCP', 'TypeScript', 'Solidity'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 右侧技能 */}
          <div className="space-y-10 lg:col-span-3">
            {skills.map((group, gi) => (
              <motion.div
                key={group.group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: gi * 0.1 }}
              >
                <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-accent">
                  {group.group}
                </h3>
                <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {group.items.map((s, i) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.05} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm text-zinc-300">{name}</span>
        <span className="font-mono text-xs text-zinc-500">{level}</span>
      </div>
      <div className="h-[2px] w-full overflow-hidden bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-gradient-to-r from-accent/60 to-accent shadow-[0_0_8px_rgb(var(--color-accent)/0.5)]"
        />
      </div>
    </div>
  );
}
