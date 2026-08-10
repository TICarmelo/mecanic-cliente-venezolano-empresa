'use client';

import { useEffect } from 'react';
import { useAnimationStore } from '@/store/animation-store';

/**
 * Providers — Envuelve la aplicación con proveedores de estado
 * y efectos globales (noise overlay, lighting dinámico).
 * Se ejecuta solo en cliente ('use client').
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const setHydrated = useAnimationStore((s) => s.setHydrated);
  const setPrefersReducedMotion = useAnimationStore((s) => s.setPrefersReducedMotion);

  useEffect(() => {
    setHydrated(true);

    // Detectar prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mq.addEventListener('change', handleChange);

    return () => mq.removeEventListener('change', handleChange);
  }, [setHydrated, setPrefersReducedMotion]);

  return <>{children}</>;
}