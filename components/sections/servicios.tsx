'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SERVICE_PRODUCTS, type ServiceProduct } from '@/lib/constants';

/**
 * Catálogo — Imágenes puras. Sin paneles, sin badges, sin ruido.
 * Stack horizontal: carta activa al centro, adyacentes asomadas a los lados.
 * Auto-rotación cada 5s. Click abre modal con datos comerciales.
 */
export default function ServiciosSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<ServiceProduct | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const items = SERVICE_PRODUCTS;
  const totalItems = items.length;

  const startAutoPlay = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalItems);
    }, 5000);
  }, [totalItems]);

  const resetAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoPlay();
  }, [startAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoPlay]);

  const goTo = (index: number) => {
    setActiveIndex(index);
    resetAutoPlay();
  };

  const openModal = (product: ServiceProduct) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = '';
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => new Set(prev).add(id));
  };

  const getFallbackImage = (category: string) =>
    `https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80`;

  const getItemStyle = (index: number) => {
    const offset = index - activeIndex;
    let normOffset = offset;
    if (normOffset > totalItems / 2) normOffset -= totalItems;
    if (normOffset < -totalItems / 2) normOffset += totalItems;

    const absOff = Math.abs(normOffset);
    const isActive = normOffset === 0;
    const translateX = normOffset * 28;
    const scale = 1 - absOff * 0.10;
    const opacity = absOff <= 2 ? 1 - absOff * 0.42 : 0;
    const zIndex = totalItems - absOff;
    const blur = absOff * 1.8;

    return { translateX, scale, opacity, zIndex, blur, isActive };
  };

  const categoryLabels: Record<string, string> = {
    mechanical: 'Ingeniería Mecánica',
    electrical: 'Ingeniería Eléctrica',
    civil: 'Construcción Civil',
    welding: 'Soldadura Especializada',
  };

  return (
    <>
      <section
        id="servicios"
        className="relative py-section overflow-hidden"
        style={{ background: 'transparent' }}
        aria-label="Catálogo de productos y servicios"
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          {/* Encabezado — jerarquía máxima */}
          <div className="mb-14 lg:mb-18 text-center">
            <h2 className="font-display font-bold text-text-primary mb-6 leading-[0.95]" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}>
              Catálogo de <span className="text-accent-orange">soluciones</span>
            </h2>
            <p className="text-text-secondary text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              Equipos, sistemas y servicios de ingeniería para el sector industrial.
            </p>
          </div>

          {/* Stack horizontal de imágenes */}
          <div className="relative flex items-center justify-center" style={{ height: 'clamp(420px, 52vw, 580px)' }}>
            <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center perspective-1200">
              {items.map((product, index) => {
                const style = getItemStyle(index);
                const imageFailed = imageErrors.has(product.id);
                const imgSrc = imageFailed ? getFallbackImage(product.category) : product.image;

                return (
                  <motion.div
                    key={product.id}
                    className="absolute preserve-3d"
                    style={{
                      width: 'clamp(300px, 75vw, 680px)',
                      pointerEvents: style.isActive ? 'auto' : 'none',
                    }}
                    animate={{
                      zIndex: style.zIndex,
                      x: style.translateX * 10,
                      scale: style.scale,
                      opacity: style.opacity,
                      filter: `blur(${style.blur}px)`,
                    }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    onClick={() => style.isActive && openModal(product)}
                  >
                    <div
                      className="relative w-full overflow-hidden shadow-2xl group"
                      style={{
                        aspectRatio: '16/9',
                        borderRadius: '2px',
                        cursor: style.isActive ? 'pointer' : 'default',
                        boxShadow: style.isActive
                          ? '0 30px 90px rgba(44,36,22,0.32), 0 10px 30px rgba(44,36,22,0.18)'
                          : '0 10px 36px rgba(44,36,22,0.08)',
                      }}
                    >
                      {/* Imagen */}
                      <img
                        src={imgSrc}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        style={{ filter: 'saturate(0.85) contrast(1.07) brightness(0.94)' }}
                        onError={() => handleImageError(product.id)}
                      />

                      {/* Overlay sutil solo en activa */}
                      {style.isActive && (
                        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 bg-gradient-to-t from-black/65 via-black/20 to-transparent">
                          <span className="inline-block text-[10px] font-mono text-white/55 tracking-[0.2em] uppercase mb-2">
                            {categoryLabels[product.category] || product.category}
                          </span>
                          <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-1 leading-tight">
                            {product.title}
                          </h3>
                          <p className="text-white/65 text-sm lg:text-base max-w-md leading-relaxed">
                            {product.tagline}
                          </p>
                          <span className="inline-block mt-3 text-xs text-white/35 font-mono tracking-wider">
                            Click para detalles
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Flechas */}
            <button
              onClick={() => goTo((activeIndex - 1 + totalItems) % totalItems)}
              className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/80 backdrop-blur-md hover:bg-white shadow-xl transition-all duration-300"
              aria-label="Producto anterior"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              onClick={() => goTo((activeIndex + 1) % totalItems)}
              className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/80 backdrop-blur-md hover:bg-white shadow-xl transition-all duration-300"
              aria-label="Producto siguiente"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          {/* Indicadores */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange"
                style={{
                  width: i === activeIndex ? '30px' : '8px',
                  height: '8px',
                  backgroundColor: i === activeIndex ? 'var(--accent-orange)' : 'var(--border-medium)',
                  borderRadius: '4px',
                }}
                aria-label={`Producto ${i + 1}`}
                aria-current={i === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-text-primary/55 backdrop-blur-md" />
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative bg-surface-card max-w-lg w-full overflow-hidden"
              style={{ borderRadius: '2px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(0.9) contrast(1.06)' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getFallbackImage(selectedProduct.category);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-card to-transparent" />
                <button onClick={closeModal} className="absolute top-4 right-4 p-2 rounded-full bg-surface-card/70 backdrop-blur-sm hover:bg-surface-card transition-colors" aria-label="Cerrar">
                  <X size={18} className="text-text-primary" />
                </button>
              </div>
              <div className="p-8">
                <span className="text-[10px] font-mono text-accent-orange tracking-[0.2em] uppercase">
                  {categoryLabels[selectedProduct.category]}
                </span>
                <h3 className="font-display text-2xl font-bold text-text-primary mt-2 mb-1">{selectedProduct.title}</h3>
                <p className="text-text-muted text-sm mb-4">{selectedProduct.tagline}</p>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">{selectedProduct.description}</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {selectedProduct.specs.map((spec, i) => (
                    <div key={i} className="text-center p-3 bg-surface-alt" style={{ borderRadius: '2px' }}>
                      <div className="text-xs text-text-muted mb-1">{spec.label}</div>
                      <div className="text-sm font-semibold text-text-primary">{spec.value}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display text-3xl font-bold text-accent-orange">{selectedProduct.price}</span>
                </div>
                <Button variant="industrial" className="w-full" onClick={() => { closeModal(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  Solicitar cotización
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}