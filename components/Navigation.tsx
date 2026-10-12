'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, profile } from '@/lib/data';
import { easeOutExpo, itemSlide } from '@/lib/motion';
import clsx from 'clsx';

const mobileMenu = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.35, ease: easeOutExpo, when: 'beforeChildren', staggerChildren: 0.05 },
  },
};

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOutExpo }}
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300',
        scrolled
          ? 'bg-[#0a0a0f]/95 border-b border-white/[0.08] shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white text-sm font-bold transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 group-active:scale-95">
            {profile.initials}
          </div>
          <span className="text-white font-semibold hidden sm:block">
            Shivam <span className="text-violet-400">Mishra</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.href)}
              aria-current={active === link.href ? 'page' : undefined}
              className={clsx(
                'relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                active === link.href
                  ? 'text-violet-400'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              )}
            >
              {active === link.href && (
                <motion.span
                  layoutId="nav-active-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-lg bg-violet-500/10 ring-1 ring-violet-500/20"
                />
              )}
              <span className="relative">{link.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="btn-shine hidden sm:flex px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-[background-color,transform] duration-200 active:scale-95"
          >
            Hire Me
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="md:hidden text-slate-400 hover:text-white p-2"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            variants={mobileMenu}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="md:hidden bg-[#0a0a0f] border-b border-white/[0.08] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  variants={itemSlide}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === link.href ? 'page' : undefined}
                  className={clsx(
                    'py-2 text-sm font-medium transition-colors',
                    active === link.href
                      ? 'text-violet-400'
                      : 'text-slate-300 hover:text-violet-400'
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                variants={itemSlide}
                href={`mailto:${profile.email}`}
                className="btn-shine mt-2 px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg text-center active:scale-95 transition-transform"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
