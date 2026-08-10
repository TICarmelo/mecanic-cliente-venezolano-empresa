'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Input — Campo de formulario con efecto neón azul eléctrico al focus.
 * Bordes sutiles, tipografía Inter, transición de sombra animada.
 * Soporta variante texturizada para formularios especiales.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Variante con textura de fondo */
  textured?: boolean;
  /** Etiqueta accesible */
  label?: string;
  /** Mensaje de error */
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, textured, label, error, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          ref={ref}
          className={cn(
            'flex h-12 w-full rounded-button border border-border-subtle bg-surface-card px-4 py-3 text-sm text-text-primary',
            'font-body placeholder:text-text-muted',
            'transition-all duration-300',
            'focus:border-accent-blue focus:shadow-neon-blue focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'hover:border-border-medium',
            textured && 'bg-line-pattern bg-opacity-50',
            error && 'border-accent-orange focus:shadow-neon-orange',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-xs text-accent-orange" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

/**
 * Textarea con el mismo estilo neón.
 */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || React.useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'flex min-h-[120px] w-full rounded-button border border-border-subtle bg-surface-card px-4 py-3 text-sm text-text-primary',
            'font-body placeholder:text-text-muted resize-y',
            'transition-all duration-300',
            'focus:border-accent-blue focus:shadow-neon-blue focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'hover:border-border-medium',
            error && 'border-accent-orange focus:shadow-neon-orange',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="mt-1.5 text-xs text-accent-orange" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Input, Textarea };