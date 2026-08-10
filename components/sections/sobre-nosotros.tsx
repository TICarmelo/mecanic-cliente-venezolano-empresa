'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { COUNTERS, COMPANY } from '@/lib/constants';
import { useIntersection } from '@/hooks/use-intersection';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  isActive,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  isActive: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const nextValue = Math.min(Math.round(increment * step), value);
      setCurrent(nextValue);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isActive, value]);

  return (
    <div className="text-center">
      <div className="text-4xl lg:text-5xl font-display font-bold text-text-primary mb-1">
        {prefix}{current.toLocaleString()}{suffix}
      </div>
      <p className="text-xs text-text-muted uppercase tracking-wider font-mono">{label}</p>
    </div>
  );
}

/**
 * Sobre Nosotros — Video holográfico inmersivo + vitrina glass.
 * Columna izquierda: el video NO es una tarjeta, sino el fondo mismo
 * del contenedor. Se integra mediante un degradado radial que desvanece
 * los bordes hacia el fondo de la sección, creando la ilusión de que el
 * video está proyectado sobre la superficie.
 * Columna derecha: panel glass con texto corporativo y contadores.
 */
export default function SobreNosotrosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: countersRef, isIntersecting: countersVisible } = useIntersection<HTMLDivElement>({
    triggerOnce: true,
    threshold: 0.3,
  });

  useGSAP(() => {
    gsap.fromTo('.about-content', { x: -40, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
    });
  }, { scope: sectionRef });

  // Pausar/reanudar video según visibilidad
  const { ref: videoContainerRef, isIntersecting: videoVisible } = useIntersection<HTMLDivElement>({
    threshold: 0.4,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (videoVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [videoVisible]);

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="relative py-section overflow-hidden bg-transparent"
      aria-label="Sobre MECANICORP"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Columna izquierda: Video holográfico inmersivo */}
          <div className="lg:col-span-5" ref={videoContainerRef}>
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: '4/5',
                borderRadius: '2px',
                // El video se integra como fondo: sin sombra dura, sin borde
                background: 'transparent',
              }}
            >
              {/* Video como capa de fondo */}
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                poster="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'saturate(0.75) contrast(1.08) brightness(0.8)' }}
              >
                <source
                  src="https://videos.pexels.com/video-files/856309/856309-hd_1920_1080_25fps.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Overlay holográfico: desvanece los bordes del video hacia el fondo */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    /* Degradado radial que desvanece los bordes */
                    radial-gradient(ellipse 80% 85% at 50% 50%, transparent 40%, var(--surface-primary, #F6F4F0) 100%),
                    /* Viñeta interna sutil */
                    radial-gradient(ellipse 65% 70% at 50% 50%, transparent 60%, rgba(44,36,22,0.15) 100%)
                  `,
                }}
              />

              {/* Brillo holográfico en el centro */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(ellipse 40% 50% at 45% 40%, rgba(249,247,244,0.25) 0%, transparent 70%)
                  `,
                }}
              />
            </div>
          </div>

          {/* Columna derecha: Panel glass vitrina */}
          <div className="lg:col-span-7 about-content">
            <div
              className="p-10 lg:p-12"
              style={{
                background: 'rgba(255,255,255,0.45)',
                backdropFilter: 'blur(24px) saturate(1.3)',
                WebkitBackdropFilter: 'blur(24px) saturate(1.3)',
                border: '1px solid rgba(232,227,220,0.7)',
                borderRadius: '2px',
                boxShadow: '0 2px 0 rgba(255,255,255,0.6) inset, 0 12px 48px rgba(44,36,22,0.06)',
              }}
            >
              <span className="text-[10px] font-mono text-accent-orange tracking-[0.25em] uppercase">
                Sobre nosotros
              </span>
              <h2 className="font-display text-h2 font-bold text-text-primary mt-4 mb-6 leading-[1.1]">
                Ingeniería con <span className="text-accent-orange">15 años</span> de trayectoria
              </h2>

              <p className="text-text-secondary text-body-lg leading-relaxed mb-8 max-w-xl">
                {COMPANY.description}
              </p>

              <div ref={countersRef} className="grid grid-cols-4 gap-6 mb-10">
                {COUNTERS.map((counter) => (
                  <AnimatedCounter
                    key={counter.id}
                    value={counter.value}
                    suffix={counter.suffix}
                    prefix={counter.prefix}
                    label={counter.label}
                    isActive={countersVisible}
                  />
                ))}
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-mono text-text-muted tracking-wider uppercase">
                <span>ISO 9001</span>
                <span>AWS D1.1</span>
                <span>ASME IX</span>
                <span>Construcción</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}