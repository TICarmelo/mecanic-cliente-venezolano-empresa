'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { Phone, Mail, MapPin, Instagram, Linkedin, ArrowUp, X, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { COMPANY, NAV_LINKS, SOCIAL } from '@/lib/constants';

/**
 * Footer — Pie de página con datos de contacto, navegación y redes.
 * Diseño industrial con fondo oscurecido sutil y acentos dorados.
 */
export default function Footer() {
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const whatsappBuy = 'https://wa.me/17866057557?text=' + encodeURIComponent('Hola, deseo adquirir la Landing Profesional MECANICORP por $200 USD. Solicito los detalles de pago y entrega.');
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface-alt border-t border-border-subtle" role="contentinfo">
      {/* Grid principal */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-section-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Columna 1: Marca */}
          <div className="lg:col-span-1">
            <Link href="#home" className="inline-flex flex-col items-start">
              {/* Logo imagen (fallback a texto si no existe) */}
              {!logoError ? (
                <img
                  src="/logo.png"
                  alt="MECANICORP C&J C.A"
                  className="h-10 w-auto object-contain mb-1"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <>
                  <span className="font-display text-xl font-bold tracking-tight text-text-primary">
                    MECANI<span className="text-accent-orange">CORP</span>
                  </span>
                  <span className="text-[10px] font-mono text-text-muted tracking-[0.15em] uppercase">
                    C&J C.A
                  </span>
                </>
              )}
            </Link>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
              {COMPANY.tagline}.<br />{COMPANY.subtitle}.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className="font-display text-sm font-bold text-text-primary mb-4 uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2.5" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent-orange transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="font-display text-sm font-bold text-text-primary mb-4 uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-accent-orange transition-colors duration-200"
                >
                  <Phone size={14} className="text-accent-orange shrink-0" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-accent-orange transition-colors duration-200"
                >
                  <Mail size={14} className="text-accent-orange shrink-0" />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2.5 text-sm text-text-secondary">
                  <MapPin size={14} className="text-accent-orange shrink-0 mt-0.5" />
                  {COMPANY.address}
                </span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes sociales y CTA */}
          <div>
            <h4 className="font-display text-sm font-bold text-text-primary mb-4 uppercase tracking-wider">
              Síguenos
            </h4>
            <div className="flex items-center gap-3 mb-6">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-button border border-border-subtle text-text-muted hover:text-accent-orange hover:border-accent-orange transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-button border border-border-subtle text-text-muted hover:text-accent-blue hover:border-accent-blue transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
            <Button
              variant="industrial"
              size="sm"
              className="w-full"
              onClick={() => {
                document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Solicitar presupuesto
            </Button>
          </div>
        </div>
      </div>

      <Separator variant="gradient" />

      {/* Botón "VER PRECIO WEB" centrado */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex justify-center">
        <button
          onClick={() => setShowPriceModal(true)}
          style={{
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(16px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
            border: '1px solid rgba(232,227,220,0.8)',
            borderRadius: '2px',
            boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset, 0 4px 20px rgba(44,36,22,0.06)',
          }}
          className="px-8 py-3 text-sm font-medium tracking-widest uppercase text-text-muted hover:text-accent-orange transition-all duration-500"
        >
          VER PRECIO WEB
        </button>
      </div>

      {/* Modal de precio */}
      <AnimatePresence>
        {showPriceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowPriceModal(false)}
          >
            <div className="absolute inset-0 bg-text-primary/55 backdrop-blur-md" />
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative bg-surface-card max-w-md w-full overflow-hidden"
              style={{ borderRadius: '2px' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cabecera del modal */}
              <div className="p-8 pb-4 text-center">
                <button
                  onClick={() => setShowPriceModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-surface-alt/70 hover:bg-surface-alt transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={16} className="text-text-muted" />
                </button>

                {/* Logo insignia en el modal */}
                <img
                  src="/logo.png"
                  alt="MECANICORP"
                  className="h-12 w-auto object-contain mx-auto mb-4"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <h3 className="font-display text-2xl font-bold text-text-primary mb-2">
                  Landing Profesional
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  Sitio web completo con diseño industrial de alta gama.
                  Listo para desplegar en su dominio.
                </p>

                {/* Características */}
                <ul className="text-left space-y-2 mb-6">
                  {[
                    'Diseño responsivo (desktop, tablet, móvil)',
                    'Catálogo de productos interactivo',
                    'Formulario de contacto con WhatsApp',
                    'Animaciones profesionales (GSAP + Framer Motion)',
                    'SEO optimizado (Open Graph, metadatos)',
                    'Carga rápida — 104 kB bundle',
                    'Despliegue incluido en Vercel',
                    'Código fuente no incluido — licencia de uso',
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <Check size={14} className="text-accent-olive shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Precios */}
                <div className="border-t border-border-subtle pt-6">
                  {/* Precio original tachado */}
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-lg text-text-muted line-through">$320</span>
                    <span className="text-xs font-medium text-accent-orange bg-accent-orange/10 px-2 py-0.5 rounded-full">
                      Oferta válida por 3 días
                    </span>
                  </div>
                  {/* Precio de venta */}
                  <div className="flex items-baseline justify-center gap-1 mb-6">
                    <span className="font-display text-5xl font-bold text-accent-orange">$200</span>
                    <span className="text-sm text-text-muted">USD</span>
                  </div>

                  <a
                    href={whatsappBuy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button
                      variant="industrial"
                      className="w-full"
                      onClick={() => setShowPriceModal(false)}
                    >
                      Adquirir ahora
                    </Button>
                  </a>
                  <p className="text-[10px] text-text-muted text-center mt-3">
                    Licencia de uso del sitio web compilado. No incluye código fuente ni propiedad intelectual.<br />
                    <span className="text-accent-orange font-medium">© TICARMELO</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barra inferior */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-muted">
          &copy; {new Date().getFullYear()} {COMPANY.name} — RIF: {COMPANY.rif}. Todos los derechos reservados. Diseño por <span className="text-accent-orange">TICARMELO</span>.
        </p>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-xs text-text-muted hover:text-accent-orange transition-colors duration-200"
          aria-label="Volver al inicio"
        >
          <ArrowUp size={14} />
          Volver arriba
        </button>
      </div>
    </footer>
  );
}