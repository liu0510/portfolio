import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduce || isCoarse) {
      setEnabled(false);
      return;
    }
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-0 h-[480px] w-[480px] rounded-full"
      style={{
        background:
          'radial-gradient(circle, rgba(0,229,255,0.18) 0%, rgba(0,229,255,0.06) 35%, rgba(0,229,255,0) 70%)',
        mixBlendMode: 'screen',
      }}
      animate={{ x: pos.x - 240, y: pos.y - 240 }}
      transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.6 }}
    />
  );
}
