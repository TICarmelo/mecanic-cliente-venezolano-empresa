'use client';

import { useEffect, useRef } from 'react';
import { useAnimationStore } from '@/store/animation-store';
import { throttle } from '@/lib/utils';

/**
 * Hook que detecta la sección activa según el scroll.
 * Usa IntersectionObserver para determinar qué sección está en el viewport.
 * Actualiza el store de Zustand para que el navbar refleje la sección activa.
 */
export function useScrollSpy(sectionIds: string[], offset = 100) {
  const setActiveSection = useAnimationStore((s) => s.setActiveSection);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Ordenamos por ratio de intersección para priorizar la más visible
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        const id = visible[0].target.id;
        if (id) setActiveSection(id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: `-${offset}px 0px -40% 0px`,
      threshold: [0, 0.1, 0.25, 0.5],
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sectionIds, offset, setActiveSection]);

  // Throttled scroll handler como respaldo
  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollY = window.scrollY + offset;
      let currentSection = sectionIds[0] || 'home';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          currentSection = id;
        }
      }
      setActiveSection(currentSection);
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset, setActiveSection]);
}