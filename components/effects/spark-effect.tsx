'use client';

import { useRef, useCallback } from 'react';

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

/**
 * SparkEffect — Sistema de partículas que simula chispas de soldadura.
 * Se activa al hacer clic en un botón, emitiendo 25-35 partículas
 * con colores naranja/amarillo/blanco, trayectoria radial y fade out.
 * Duración: ~600ms por partícula.
 */
export function useSparkEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<SparkParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const triggerSpark = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar canvas al viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Colores de chispa industrial
    const colors = [
      '#D96C1A', // naranja industrial
      '#F5A623', // ámbar
      '#FFD700', // oro
      '#FFFFFF', // blanco (centro caliente)
      '#C45A10', // naranja oscuro
      '#E8892C', // cobre claro
    ];

    const particleCount = 28 + Math.floor(Math.random() * 12);

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const speed = 2 + Math.random() * 5;
      const life = 400 + Math.random() * 300;

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 3, // tendencia hacia arriba
        life,
        maxLife: life,
        size: 1.5 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Iniciar loop de animación si no está corriendo
    if (!animFrameRef.current) {
      animate(ctx);
    }
  }, []);

  const animate = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 16; // ~60fps

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Actualizar posición
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravedad
        p.vx *= 0.98; // fricción

        // Calcular opacidad basada en vida restante
        const alpha = p.life / p.maxLife;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      if (particles.length > 0) {
        animFrameRef.current = requestAnimationFrame(() => animate(ctx));
      } else {
        animFrameRef.current = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    },
    []
  );

  return { canvasRef, triggerSpark };
}

/**
 * Componente canvas overlay para las chispas.
 * Se monta una sola vez en el layout y se comunica vía ref.
 */
export function SparkCanvas({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}) {
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
      }}
    />
  );
}