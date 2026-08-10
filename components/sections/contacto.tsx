'use client';

import { useRef, useState, FormEvent, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input, Textarea } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { COMPANY } from '@/lib/constants';
import { useSparkEffect, SparkCanvas } from '@/components/effects/spark-effect';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface FormData {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  servicio: string;
  mensaje: string;
}

const initialFormData: FormData = {
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
  servicio: '',
  mensaje: '',
};

/**
 * ContactoSection — Formulario con fondo texturizado (pattern de líneas finas)
 * y campos con efecto neón azul eléctrico al focus.
 * A la derecha, información de contacto y mapa de Google embebido.
 * Botón submit con efecto spark al enviar.
 */
export default function ContactoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { canvasRef: sparkCanvasRef, triggerSpark } = useSparkEffect();

  useGSAP(
    () => {
      gsap.fromTo(
        '.contact-form',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.contact-info',
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }
    if (!formData.mensaje.trim()) newErrors.mensaje = 'El mensaje es requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (!validate()) return;

      setStatus('submitting');

      // Simular envío (aquí iría la integración real con API/WhatsApp)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Construir mensaje de WhatsApp
        const whatsappMessage = encodeURIComponent(
          `*Solicitud de Cotización — MECANICORP C&J C.A*\n\n` +
            `👤 *Nombre:* ${formData.nombre}\n` +
            `🏢 *Empresa:* ${formData.empresa || 'No especificada'}\n` +
            `📧 *Email:* ${formData.email}\n` +
            `📞 *Teléfono:* ${formData.telefono || 'No especificado'}\n` +
            `🔧 *Servicio:* ${formData.servicio || 'No especificado'}\n\n` +
            `📝 *Mensaje:*\n${formData.mensaje}`
        );

        // Efecto spark en el botón
        const btn = document.getElementById('contact-submit-btn');
        if (btn) {
          const rect = btn.getBoundingClientRect();
          triggerSpark(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }

        setStatus('success');
        setFormData(initialFormData);

        // Abrir WhatsApp después de 1s
        setTimeout(() => {
          window.open(`https://wa.me/584241234567?text=${whatsappMessage}`, '_blank');
        }, 1000);
      } catch {
        setStatus('error');
      }
    },
    [formData, triggerSpark]
  );

  return (
    <>
      <SparkCanvas canvasRef={sparkCanvasRef} />

      <section
        ref={sectionRef}
        id="contacto"
        className="relative py-section bg-transparent"
        aria-label="Contacto"
      >
        {/* Fondo texturizado con patrón de líneas */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(44,36,22,0.4) 2px, rgba(44,36,22,0.4) 3px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(44,36,22,0.3) 2px, rgba(44,36,22,0.3) 3px)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Encabezado */}
          <div className="text-center mb-12 lg:mb-16">
            <Badge variant="gold" className="mb-4">
              <Send size={12} />
              Contacto
            </Badge>
            <h2 className="font-display text-h2 font-bold text-text-primary mb-4 text-balance">
              Solicite su
              <br />
              <span className="text-accent-gold">cotización personalizada</span>
            </h2>
            <p className="max-w-xl mx-auto text-text-secondary text-body-lg">
              Cuéntenos sobre su proyecto. Nuestro equipo técnico le responderá en menos de 24 horas con una propuesta detallada.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Formulario */}
            <form className="contact-form space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Nombre completo"
                  placeholder="Ej. Juan Méndez"
                  value={formData.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  error={errors.nombre}
                  required
                />
                <Input
                  label="Empresa"
                  placeholder="Nombre de su empresa"
                  value={formData.empresa}
                  onChange={(e) => handleChange('empresa', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Email corporativo"
                  type="email"
                  placeholder="ejemplo@empresa.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  error={errors.email}
                  required
                />
                <Input
                  label="Teléfono"
                  type="tel"
                  placeholder="+58 424-1234567"
                  value={formData.telefono}
                  onChange={(e) => handleChange('telefono', e.target.value)}
                />
              </div>

              <Input
                label="Servicio de interés"
                placeholder="Ej. Mantenimiento Industrial, Soldadura..."
                value={formData.servicio}
                onChange={(e) => handleChange('servicio', e.target.value)}
              />

              <Textarea
                label="Describa su necesidad"
                placeholder="Describa el alcance, equipos involucrados, ubicación y cualquier detalle relevante para prepararle una cotización precisa."
                value={formData.mensaje}
                onChange={(e) => handleChange('mensaje', e.target.value)}
                error={errors.mensaje}
                required
              />

              <Button
                id="contact-submit-btn"
                type="submit"
                variant="industrial"
                size="xl"
                className="w-full group"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Enviando cotización...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 size={20} />
                    ¡Solicitud enviada con éxito!
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Cotizar ahora
                  </>
                )}
              </Button>

              {status === 'error' && (
                <p className="text-center text-sm text-accent-orange" role="alert">
                  Hubo un error al enviar. Intente de nuevo o contáctenos directamente.
                </p>
              )}

              <p className="text-xs text-text-muted text-center mt-4">
                Al enviar, acepta nuestra política de privacidad. Sus datos están seguros.
              </p>
            </form>

            {/* Información de contacto + Mapa */}
            <div className="contact-info space-y-8">
              {/* Datos de contacto */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-accent-orange" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Teléfono</p>
                    <a
                      href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                      className="text-text-secondary hover:text-accent-orange transition-colors"
                    >
                      {COMPANY.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-accent-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Email</p>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-text-secondary hover:text-accent-orange transition-colors"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-olive/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-accent-olive" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Dirección</p>
                    <p className="text-text-secondary">{COMPANY.address}</p>
                  </div>
                </div>
              </div>

              <Separator variant="gradient" />

              {/* Mapa (iframe Google Maps) */}
              <div className="relative w-full h-64 lg:h-72 rounded-card overflow-hidden border border-border-subtle shadow-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.5!2d-68.0!3d10.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDEyJzAwLjAiTiA2OMKwMDAnMDAuMCJX!5e0!3m2!1ses!2sve!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación MECANICORP C&J C.A"
                  className="grayscale-[0.3]"
                />
                {/* Overlay con pin personalizado */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center shadow-lg shadow-accent-orange/40"
                  >
                    <MapPin size={16} className="text-white" />
                  </motion.div>
                </div>
              </div>

              {/* RIF y datos legales */}
              <p className="text-xs text-text-muted">
                {COMPANY.name} — RIF: {COMPANY.rif}
                <br />
                Horario: Lunes a Viernes, 8:00 AM – 5:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}