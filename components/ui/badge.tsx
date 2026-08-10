import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Badge — Chip industrial para etiquetas categorías y estados.
 * Variantes cromáticas alineadas con la paleta industrial.
 */
const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-border-subtle bg-surface-light text-text-secondary hover:bg-surface-alt',
        orange:
          'border-accent-orange/20 bg-accent-orange/10 text-accent-orange',
        blue: 'border-accent-blue/20 bg-accent-blue/10 text-accent-blue',
        olive:
          'border-accent-olive/20 bg-accent-olive/10 text-accent-olive',
        gold: 'border-accent-gold/20 bg-accent-gold/10 text-accent-gold',
        outline: 'border-border-medium text-text-secondary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };