'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

/**
 * Hook para detectar cuando un elemento entra/sale del viewport.
 * Útil para lazy loading, animaciones al scroll, pausar videos, etc.
 */
export function useIntersection<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = false,
    onEnter,
    onLeave,
  } = options;

  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const hasTriggered = useRef(false);

  const setRef = useCallback((node: T | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        const visible = entry.isIntersecting;

        if (triggerOnce && hasTriggered.current && visible) return;

        setIsIntersecting(visible);

        if (visible) {
          hasTriggered.current = true;
          onEnter?.();
        } else {
          onLeave?.();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, onEnter, onLeave]);

  return { ref: setRef, isIntersecting };
}