import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fusiona clases de Tailwind con clsx y tailwind-merge.
 * Resuelve conflictos de clases automáticamente.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Genera un ID único para elementos dinámicos.
 */
export function generateId(): string {
  return `mec-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Interpola entre dos valores numéricos.
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Clamp: restringe un valor entre min y max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Debounce para eventos de alto rendimiento (scroll, resize, mousemove).
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle para limitar la frecuencia de ejecución.
 */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Valores por defecto para el sistema de animaciones.
 */
export const ANIMATION_DEFAULTS = {
  duration: {
    fast: 0.2,
    base: 0.3,
    slow: 0.4,
    spring: 0.5,
  },
  ease: {
    out: [0.4, 0, 0.2, 1] as [number, number, number, number],
    inOut: [0.77, 0, 0.175, 1] as [number, number, number, number],
    spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
  },
} as const;

/**
 * URL de imágenes de referencia para la landing (Unsplash).
 * Se usan con next/image y remotePatterns configurados.
 */
export const IMAGE_URLS = {
  hero: {
    machinery: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=95',
    welding: 'https://images.unsplash.com/photo-1504917595217-d4bb485cf8f6?w=1920&q=95',
    factory: 'https://images.unsplash.com/photo-1565034946487-077786996e27?w=1920&q=95',
    gears: 'https://images.unsplash.com/photo-1537462715879-589e7b38b2d2?w=1920&q=95',
  },
  projects: {
    industrial: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=1200&q=95',
    electrical: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=95',
    construction: 'https://images.unsplash.com/photo-1590650151155-3b62c5a0c7c1?w=1200&q=95',
    maintenance: 'https://images.unsplash.com/photo-1504328341002-9204e5263b51?w=1200&q=95',
    welding_project: 'https://images.unsplash.com/photo-1572981779307-38b8cabbec7b?w=1200&q=95',
  },
  about: {
    team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=95',
    workshop: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=95',
    precision: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=95',
    plan: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=95',
  },
} as const;

/**
 * Filtro CSS para armonizar imágenes con la paleta industrial.
 */
export const IMAGE_FILTER = 'saturate(0.9) contrast(1.05) brightness(0.98)';