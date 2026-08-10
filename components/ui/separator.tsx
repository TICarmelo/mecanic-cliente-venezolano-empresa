'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/lib/utils';

/**
 * Separator — Línea divisoria con variantes de color industrial.
 * Soporta gradiente naranja-azul para líneas destacadas.
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    /** Variante cromática */
    variant?: 'default' | 'gradient' | 'orange' | 'gold';
  }
>(
  (
    { className, orientation = 'horizontal', decorative = true, variant = 'default', ...props },
    ref
  ) => {
    const variantStyles = {
      default: 'bg-border-subtle',
      gradient:
        'bg-gradient-to-r from-transparent via-accent-orange to-transparent',
      orange: 'bg-accent-orange/30',
      gold: 'bg-accent-gold/30',
    };

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          'shrink-0',
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Separator.displayName = 'Separator';

export { Separator };