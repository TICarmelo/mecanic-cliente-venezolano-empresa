'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import NoiseOverlay from '@/components/effects/noise-overlay';
import DynamicLighting from '@/components/effects/dynamic-lighting';
import { useScrollSpy } from '@/hooks/use-scroll-spy';

// Hero — carga inmediata (critical path)
import HeroSection from '@/components/sections/hero';

// Catálogo — lazy con skeleton
const ServiciosSection = dynamic(
  () => import('@/components/sections/servicios'),
  {
    ssr: false,
    loading: () => (
      <div className="py-section" style={{ background: 'linear-gradient(180deg, #F0EEEB 0%, #F6F4F0 40%, #EDE8E3 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 animate-pulse">
          <div className="h-16 w-72 bg-border-subtle rounded mx-auto mb-4" />
          <div className="h-8 w-96 bg-border-subtle rounded mx-auto mb-12" />
          <div className="h-[500px] bg-surface-alt" style={{ borderRadius: '4px' }} />
        </div>
      </div>
    ),
  }
);

// Sobre Nosotros — lazy
const SobreNosotrosSection = dynamic(
  () => import('@/components/sections/sobre-nosotros'),
  {
    ssr: false,
    loading: () => (
      <div className="py-section" style={{ background: 'linear-gradient(180deg, #EDE8E3 0%, #F6F4F0 50%, #F9F7F4 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 animate-pulse grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 h-[500px] bg-surface-alt" style={{ borderRadius: '2px' }} />
          <div className="lg:col-span-7 space-y-4">
            <div className="h-6 w-28 bg-border-subtle" />
            <div className="h-14 w-96 bg-border-subtle" />
            <div className="h-28 bg-border-subtle" />
          </div>
        </div>
      </div>
    ),
  }
);

// Proyectos — lazy
const ProyectosSection = dynamic(
  () => import('@/components/sections/proyectos'),
  {
    ssr: false,
    loading: () => (
      <div className="py-section" style={{ background: 'linear-gradient(180deg, #F9F7F4 0%, #F4F1EB 40%, #F6F4F0 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 animate-pulse">
          <div className="h-6 w-28 bg-border-subtle mb-4" />
          <div className="h-12 w-72 bg-border-subtle mb-8" />
          <div className="aspect-[21/9] bg-surface-alt" style={{ borderRadius: '12px' }} />
        </div>
      </div>
    ),
  }
);

// Contacto — lazy
const ContactoSection = dynamic(
  () => import('@/components/sections/contacto'),
  {
    ssr: false,
    loading: () => (
      <div className="py-section" style={{ background: 'linear-gradient(180deg, #F6F4F0 0%, #F9F7F4 50%, #F6F4F0 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-border-subtle" style={{ borderRadius: '6px' }} />
            ))}
          </div>
          <div className="space-y-4">
            <div className="h-16 bg-border-subtle" style={{ borderRadius: '12px' }} />
            <div className="h-64 bg-border-subtle" style={{ borderRadius: '12px' }} />
          </div>
        </div>
      </div>
    ),
  }
);

const SECTION_IDS = ['home', 'servicios', 'nosotros', 'proyectos', 'contacto'];

export default function HomePage() {
  useScrollSpy(SECTION_IDS, 80);

  return (
    <>
      <NoiseOverlay />
      <DynamicLighting />

      <Navbar />

      <main id="main-content" role="main">
        <HeroSection />

        <Suspense fallback={null}>
          <ServiciosSection />
        </Suspense>

        <Suspense fallback={null}>
          <SobreNosotrosSection />
        </Suspense>

        <Suspense fallback={null}>
          <ProyectosSection />
        </Suspense>

        <Suspense fallback={null}>
          <ContactoSection />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}