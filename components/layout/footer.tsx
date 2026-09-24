'use client';

import Link from 'next/link';
import { useState } from 'react';
import React from 'react';
import { Phone, Mail, MapPin, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { COMPANY, NAV_LINKS, SOCIAL } from '@/lib/constants';

/**
 * Footer — Pie de página con datos de contacto, navegación y redes.
 * Diseño industrial con fondo oscurecido sutil y acentos dorados.
 */
export default function Footer() {
  const [logoError, setLogoError] = useState(false);

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