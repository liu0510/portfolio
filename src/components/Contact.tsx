import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { profile } from '../data/profile';

const socials = [
  { icon: Github, href: profile.social.github, label: 'GitHub' },
  { icon: Twitter, href: profile.social.twitter, label: 'Twitter' },
  { icon: Linkedin, href: profile.social.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader index="03" label="Get in Touch" title="保持联系" />

        <motion.a
          href={`mailto:${profile.email}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="group inline-flex items-center gap-4 text-4xl font-semibold tracking-tight text-white transition-colors duration-300 hover:text-accent md:text-6xl"
        >
          <span className="break-all">{profile.email}</span>
          <ArrowUpRight className="h-10 w-10 shrink-0 -translate-x-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 md:h-14 md:w-14" />
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-xl text-base text-zinc-400 md:text-lg"
        >
          有 Web3、AI Agent 相关的合作或想法，随时聊聊。
          也欢迎在以下平台找到我。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-wrap gap-3"
        >
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="card-border group flex items-center gap-3 rounded-full bg-white/[0.02] px-5 py-3 text-sm text-zinc-300 transition-all duration-300 hover:bg-accent/10 hover:text-accent"
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
