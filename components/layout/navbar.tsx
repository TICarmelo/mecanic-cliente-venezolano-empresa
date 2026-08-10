'use client';

import { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAnimationStore } from '@/store/animation-store';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * Navbar — Glassmorphism líquido translúcido.
 * Fondo con efecto vidrio esmerilado ultra-suave,
 * textura translúcida que refuerza el minimalismo moderno.
 * Sticky con transición sutil de opacidad al hacer scroll.
 */
export default function Navbar() {
  const activeSection = useAnimationStore((s) => s.activeSection);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    startTransition(() => {
      setIsMobileOpen(false);
    });
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
          isScrolled
            ? 'bg-[rgba(246,244,240,0.72)] backdrop-blur-2xl backdrop-saturate-150 border-b border-[rgba(232,227,220,0.6)] shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_4px_24px_rgba(44,36,22,0.04)]'
            : 'bg-[rgba(246,244,240,0.35)] backdrop-blur-lg backdrop-saturate-125 border-b border-transparent'
        )}
        role="banner"
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8" aria-label="Navegación principal">
          <div className="flex items-center justify-between h-16 lg:h-18">
              {/* Logo */}
              <button
                onClick={() => handleNavClick('#home')}
                className="flex items-center gap-2 group focus:outline-none"
                aria-label="MECANICORP — Ir al inicio"
              >
                <img
                  src="/logo.png"
                  alt="MECANICORP C&J C.A"
                  className="h-8 w-auto object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="flex flex-col items-start">
                  <span className="font-display text-lg font-bold tracking-tight text-text-primary leading-none">
                    MECANI<span className="text-accent-orange">CORP</span>
                  </span>
                  <span className="text-[10px] font-mono text-text-muted tracking-[0.15em] uppercase leading-none mt-0.5">
                    C&J C.A
                  </span>
                </div>
              </button>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1" role="list">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={cn(
                        'relative px-4 py-2 text-sm font-medium transition-all duration-300',
                        isActive
                          ? 'text-text-primary'
                          : 'text-text-muted hover:text-text-primary'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="active-nav-underline"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full"
                          style={{ backgroundColor: 'var(--accent-orange)' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="industrial"
                size="sm"
                onClick={() => handleNavClick('#contacto')}
                className="shadow-md"
              >
                Cotizar ahora
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-text-primary hover:text-accent-orange transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden bg-[rgba(246,244,240,0.95)] backdrop-blur-2xl border-t border-border-subtle overflow-hidden"
            >
              <ul className="flex flex-col p-4 gap-1" role="list">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <li key={link.href}>
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className={cn(
                          'w-full text-left px-4 py-3 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-accent-orange/8 text-accent-orange'
                            : 'text-text-secondary hover:bg-surface-alt hover:text-text-primary'
                        )}
                        style={{ borderRadius: '2px' }}
                      >
                        {link.label}
                      </button>
                    </li>
                  );
                })}
                <li className="pt-3">
                  <Button
                    variant="industrial"
                    className="w-full"
                    onClick={() => handleNavClick('#contacto')}
                  >
                    Cotizar ahora
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-16 lg:h-18" />
    </>
  );
}