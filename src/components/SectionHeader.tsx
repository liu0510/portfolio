import { motion } from 'framer-motion';

export default function SectionHeader({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <div className="mb-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-zinc-500"
      >
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-zinc-700" />
        <span>{label}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl font-bold tracking-tight text-white md:text-5xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}
