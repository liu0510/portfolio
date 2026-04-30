import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader index="02" label="Selected Work" title="项目作品" />

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link ?? '#'}
              target={p.link ? '_blank' : undefined}
              rel={p.link ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="card-border group relative flex flex-col overflow-hidden rounded-xl bg-white/[0.02] p-7 transition-all duration-500 hover:bg-white/[0.04]"
            >
              {/* hover 时的高光线 */}
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-accent via-accent/40 to-transparent transition-transform duration-500 group-hover:scale-x-100"
              />

              <div className="mb-6 flex items-start justify-between">
                <span className="font-mono text-xs tracking-widest text-zinc-500">
                  {p.year}
                </span>
                <ArrowUpRight className="h-5 w-5 -translate-x-1 translate-y-1 text-zinc-500 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent" />
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-white transition-colors group-hover:text-accent">
                {p.title}
              </h3>

              <p className="mb-6 flex-grow text-sm leading-relaxed text-zinc-400">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-400 transition-colors group-hover:bg-accent/10 group-hover:text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
