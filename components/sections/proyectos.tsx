'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PROJECTS } from '@/lib/constants';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* eslint-disable @next/next/no-img-element */
import React from 'react';

/**
 * MagnifyingGlass — Efecto de lente de aumento al hover sobre imágenes.
 * Crea un círculo que sigue al cursor y muestra la imagen ampliada.
 * Usa event listeners nativos vía useEffect para vincularse al DOM del contenedor.
 */
function MagnifyingGlass({
  containerRef,
  imageSrc,
  zoom = 2.5,
  size = 180,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imageSrc: string;
  zoom?: number;
  size?: number;
}) {
  const [pos, setPos] = React.useState({ x: 0, y: 0, visible: false });

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPos({ x, y, visible: true });
    };

    const handleMouseLeave = () => {
      setPos((p) => ({ ...p, visible: false }));
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef]);

  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{
        left: pos.x - size / 2,
        top: pos.y - size / 2,
        width: size,
        height: size,
        opacity: pos.visible ? 1 : 0,
        transition: 'opacity 0.2s ease',
        borderRadius: '50%',
        border: '3px solid var(--accent-orange)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(217,108,26,0.4)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: `${zoom * 100}%`,
          backgroundPosition: `${-pos.x * zoom + size / 2}px ${-pos.y * zoom + size / 2}px`,
          backgroundRepeat: 'no-repeat',
        }}
      />
    </div>
  );
}

/**
 * Dot indicador con efecto "respiratorio" (pulso de luz).
 */
function BreathingDot({
  active,
  onClick,
  index,
}: {
  active: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-3 h-3 rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange',
        active
          ? 'bg-accent-orange scale-125 shadow-lg shadow-accent-orange/40 animate-breathe'
          : 'bg-border-medium hover:bg-accent-orange/50'
      )}
      aria-label={`Proyecto ${index + 1}`}
      aria-current={active ? 'true' : undefined}
    />
  );
}

/**
 * ProyectosSection — Carrusel inmersivo con lente de aumento,
 * navegación por dots respiratorios y transiciones con blur.
 */
export default function ProyectosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeProject = PROJECTS[activeIndex];

  useGSAP(
    () => {
      gsap.fromTo(
        '.projects-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const goToProject = useCallback(
    (index: number) => {
      if (isTransitioning || index === activeIndex) return;
      setIsTransitioning(true);
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [activeIndex, isTransitioning]
  );

  const nextProject = () => {
    goToProject((activeIndex + 1) % PROJECTS.length);
  };

  const prevProject = () => {
    goToProject((activeIndex - 1 + PROJECTS.length) % PROJECTS.length);
  };

  // Navegación por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevProject();
      if (e.key === 'ArrowRight') nextProject();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isTransitioning]);

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      className="relative py-section bg-transparent"
      aria-label="Proyectos y casos de éxito"
    >
      {/* Trazos decorativos */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true">
        <div className="absolute top-10 left-[-5%] w-[400px] h-[400px] border border-text-primary rounded-full" />
        <div className="absolute bottom-10 right-[-5%] w-[450px] h-[450px] border border-text-primary rounded-full" />
        <div className="absolute top-1/3 right-[10%] w-72 h-[1px] bg-text-primary rotate-45" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Encabezado */}
        <div className="projects-header mb-12 lg:mb-16">
          <Badge variant="blue" className="mb-4">
            <Eye size={12} />
            Casos de éxito
          </Badge>
          <h2 className="font-display text-h2 font-bold text-text-primary mb-4 text-balance">
            Proyectos que
            <br />
            <span className="text-accent-blue">hablan por nosotros</span>
          </h2>
          <p className="max-w-xl text-text-secondary text-body-lg">
            Resultados tangibles en cada entrega. Ingeniería de precisión aplicada a
            desafíos reales con métricas de impacto verificables.
          </p>
        </div>

        {/* Carrusel */}
        <div className="relative">
          {/* Imagen principal con lente de aumento */}
          <div
            ref={imageContainerRef}
            className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-card overflow-hidden border border-border-subtle shadow-industrial group cursor-crosshair"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeProject.id}
                initial={{
                  x: direction * 80,
                  opacity: 0,
                  filter: 'blur(8px)',
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  filter: 'blur(0px)',
                }}
                exit={{
                  x: -direction * 80,
                  opacity: 0,
                  filter: 'blur(8px)',
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(0.88) contrast(1.08)' }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Lente de aumento (solo en no-touch) */}
            <div className="hidden lg:block">
              <MagnifyingGlass
                containerRef={imageContainerRef}
                imageSrc={activeProject.image}
                zoom={2.2}
                size={200}
              />
            </div>

            {/* Overlay de información */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-6 lg:p-10 bg-gradient-to-t from-text-primary/70 via-text-primary/30 to-transparent">
              <Badge variant="blue" className="mb-3">
                {activeProject.category}
              </Badge>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">
                {activeProject.title}
              </h3>
              <p className="text-white/80 text-sm lg:text-base max-w-2xl mb-4">
                {activeProject.description}
              </p>
              {/* Stats */}
              <div className="flex flex-wrap gap-4 lg:gap-6">
                {activeProject.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-white font-display text-xl lg:text-2xl font-bold">
                      {stat.value}
                    </div>
                    <div className="text-white/60 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flechas de navegación */}
            <button
              onClick={prevProject}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-surface-card/70 backdrop-blur-sm hover:bg-surface-card transition-all shadow-lg hover:shadow-xl group"
              aria-label="Proyecto anterior"
            >
              <ChevronLeft
                size={24}
                className="text-text-primary group-hover:text-accent-orange transition-colors"
              />
            </button>
            <button
              onClick={nextProject}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-surface-card/70 backdrop-blur-sm hover:bg-surface-card transition-all shadow-lg hover:shadow-xl group"
              aria-label="Proyecto siguiente"
            >
              <ChevronRight
                size={24}
                className="text-text-primary group-hover:text-accent-orange transition-colors"
              />
            </button>
          </div>

          {/* Dots de navegación */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {PROJECTS.map((_, index) => (
              <BreathingDot
                key={index}
                index={index}
                active={index === activeIndex}
                onClick={() => goToProject(index)}
              />
            ))}
          </div>
        </div>

        {/* CTA inferior */}
        <div className="text-center mt-12">
          <Button
            variant="electric"
            size="lg"
            onClick={() =>
              document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            ¿Tiene un proyecto similar?
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}