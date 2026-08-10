'use client';

/**
 * NoiseOverlay — Capa global de ruido cinematográfico.
 * Renderiza un overlay fijo con ruido procedural SVG (feTurbulence)
 * que aporta textura de grano fino a toda la experiencia.
 * Opacidad: 0.035 — perceptible pero no intrusivo.
 * pointer-events: none para no interferir con la interacción.
 */
export default function NoiseOverlay() {
  return (
    <div
      className="noise-overlay"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: 0.035,
        mixBlendMode: 'overlay',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}