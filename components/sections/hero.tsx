'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAnimationStore } from '@/store/animation-store';
import { COMPANY, HERO_COPYS, HERO_IMAGES } from '@/lib/constants';
import { useSparkEffect, SparkCanvas } from '@/components/effects/spark-effect';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Hero Section — Múltiples imágenes industriales con crossfade.
 * 7 imágenes rotan automáticamente con transición suave.
 * Título masivo, copy rotativo, CTAs glassmorphism.
 */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [copyIndex, setCopyIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);

  const setHeroAnimationComplete = useAnimationStore((s) => s.setHeroAnimationComplete);
  const { canvasRef: sparkCanvasRef, triggerSpark } = useSparkEffect();

  // Rotación de copys cada 4.2s
  useEffect(() => {
    const interval = setInterval(() => {
      setCopyIndex((prev) => (prev + 1) % HERO_COPYS.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  // Rotación de imágenes cada 5.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => setHeroAnimationComplete(true),
        delay: 0.4,
      });
      tl.fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out' }, 0.2);
      tl.fromTo(ctaRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.8);
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const handleParallax = () => {
      if (titleRef.current) titleRef.current.style.transform = `translateY(${window.scrollY * 0.06}px)`;
    };
    window.addEventListener('scroll', handleParallax, { passive: true });
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  const handleCTAClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      triggerSpark(rect.left + rect.width / 2, rect.top + rect.height / 2);
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    },
    [triggerSpark]
  );

  return (
    <>
      <SparkCanvas canvasRef={sparkCanvasRef} />
      <section ref={sectionRef} id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden" aria-label="Hero">
        {/* Imágenes rotativas con crossfade */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={imgIndex}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={HERO_IMAGES[imgIndex].src}
                alt={HERO_IMAGES[imgIndex].alt}
                className="w-full h-full object-cover"
                style={{ filter: 'saturate(0.8) contrast(1.1) brightness(0.7)' }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlay oscuro cohesivo con tinte azulado */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(18,20,28,0.72) 0%, rgba(22,24,30,0.40) 40%, rgba(44,36,22,0.55) 100%)',
            }}
          />
        </div>

        {/* Contenido */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col items-center text-center">
          <h1
            ref={titleRef}
            className="font-display font-bold text-white leading-[0.9] mb-8 tracking-[-0.03em]"
            style={{ fontSize: 'clamp(3.4rem, 9.5vw, 8rem)' }}
          >
            {COMPANY.tagline}
          </h1>

          <div className="min-h-[3.5rem] flex items-center justify-center mb-12 max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.p
                key={copyIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="text-white/80 text-lg lg:text-xl leading-relaxed font-light tracking-wide max-w-xl"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {HERO_COPYS[copyIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-5">
            <Button
              variant="glass"
              size="xl"
              onClick={handleCTAClick}
              className="relative overflow-hidden text-white font-medium tracking-wide px-12 py-5 text-base transition-all duration-500"
              style={{
                background: 'rgba(255,255,255,0.10)',
                backdropFilter: 'blur(24px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
                border: '1px solid rgba(255,255,255,0.20)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
              }}
            >
              Solicitar cotización
            </Button>
            <Button
              variant="ghost"
              size="xl"
              onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-white/70 hover:text-white border border-white/15 hover:border-white/35 px-12 py-5 text-base transition-all duration-500"
            >
              Ver catálogo
            </Button>
          </div>
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 z-[2] pointer-events-none" style={{ boxShadow: 'inset 0 0 350px rgba(0,0,0,0.55), inset 0 0 80px rgba(0,0,0,0.25)' }} />
      </section>
    </>
  );
}
