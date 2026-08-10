'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Card — Componente de tarjeta con efecto de deformación metálica 3D.
 * Al pasar el mouse, rota ligeramente en los ejes X/Y según la posición
 * del cursor, simulando la reflexión de luz sobre metal cepillado.
 * Incluye overlays de óxido en esquinas y borde con brillo.
 */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Activar efecto 3D de deformación metálica */
  metal?: boolean;
  /** Variante visual */
  variant?: 'default' | 'featured' | 'glass';
  /** Intensidad del efecto 3D (grados de rotación máximos) */
  tiltIntensity?: number;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, metal = false, variant = 'default', tiltIntensity = 8, children, ...props }, ref) => {
    const cardRef = React.useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!metal || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -tiltIntensity;
      const rotateY = ((x - centerX) / centerX) * tiltIntensity;

      cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Iluminación dinámica desde el cursor
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;
      cardRef.current.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.4) 0%, var(--surface-card) 50%)`;
    };

    const handleMouseLeave = () => {
      if (!metal || !cardRef.current) return;

      cardRef.current.style.transform =
        'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      cardRef.current.style.background = '';
      cardRef.current.style.transition =
        'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease';
    };

    const handleMouseEnter = () => {
      if (!metal || !cardRef.current) return;
      cardRef.current.style.transition = 'transform 0.15s ease-out, background 0.2s ease';
    };

    const baseStyles =
      'rounded-card border border-border-subtle bg-surface-card shadow-industrial transition-all duration-300 overflow-hidden';

    const variantStyles = {
      default: '',
      featured:
        'border-accent-gold/30 shadow-industrial-hover ring-1 ring-accent-gold/10',
      glass: 'glass',
    };

    return (
      <div
        ref={(node) => {
          cardRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(baseStyles, variantStyles[variant], 'rust-corners', className)}
        onMouseMove={metal ? handleMouseMove : undefined}
        onMouseEnter={metal ? handleMouseEnter : undefined}
        onMouseLeave={metal ? handleMouseLeave : undefined}
        style={{
          willChange: metal ? 'transform' : 'auto',
        }}
        {...props}
      >
        {/* Borde con brillo cónico animado al hover */}
        {metal && (
          <div
            className="absolute inset-0 rounded-card opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0%, rgba(217,108,26,0.15) 20%, transparent 40%, rgba(196,155,92,0.12) 60%, transparent 80%, rgba(217,108,26,0.15) 100%)',
            }}
          />
        )}
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6 pb-3', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-display text-h3 font-bold text-text-primary tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-text-secondary text-sm leading-relaxed', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};