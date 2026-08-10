'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useAnimationStore } from '@/store/animation-store';

/**
 * DynamicLighting — Simula luz de taller industrial que sigue al mouse.
 * Actualiza CSS custom properties (--mouse-x, --mouse-y) para que
 * los gradientes radiales reaccionen a la posición del cursor.
 * Implementa también una luz de scroll que varía con requestAnimationFrame.
 */
export default function DynamicLighting() {
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = useAnimationStore((s) => s.prefersReducedMotion);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion) return;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        document.documentElement.style.setProperty('--mouse-x', `${x}%`);
        document.documentElement.style.setProperty('--mouse-y', `${y}%`);
      });
    },
    [prefersReducedMotion]
  );

  const handleScroll = useCallback(() => {
    if (prefersReducedMotion) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const scrollPercent =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const y = scrollPercent * 100;
      document.documentElement.style.setProperty('--scroll-light-y', `${y}%`);
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleScroll, prefersReducedMotion]);

  // Este componente no renderiza nada visual - solo efectos
  return null;
}