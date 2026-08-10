'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Button — Componente atómico con variantes industriales.
 * Variantes: industrial (naranja, CTA principal), electric (azul, técnico),
 * olive (verde, construcción), gold (lujo), outline, ghost.
 * Soporta efecto de chispas al hacer clic mediante el callback onSpark.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        industrial:
          'btn-gradient text-text-on-accent shadow-lg hover:shadow-xl active:scale-[0.97]',
        electric:
          'bg-accent-blue text-white shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-[0.97]',
        olive:
          'bg-accent-olive text-white shadow-md hover:bg-[#5C7A1F] hover:shadow-lg active:scale-[0.97]',
        gold:
          'bg-accent-gold text-text-primary shadow-md hover:bg-[#B38A4F] hover:shadow-lg active:scale-[0.97]',
        outline:
          'border border-border-subtle bg-transparent text-text-primary hover:border-accent-orange hover:text-accent-orange hover:bg-accent-orange/5',
        ghost:
          'bg-transparent text-text-secondary hover:text-accent-orange hover:bg-accent-orange/5',
        glass:
          'glass text-text-primary hover:bg-white/80 hover:shadow-industrial',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        default: 'h-11 px-6 text-sm',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'industrial',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Callback que recibe las coordenadas del clic para el efecto spark */
  onSpark?: (x: number, y: number) => void;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onSpark, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onSpark) {
        const rect = e.currentTarget.getBoundingClientRect();
        onSpark(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
      onClick?.(e);
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };