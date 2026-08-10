import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

/**
 * Fraunces — Tipografía display para títulos.
 * Variable weight 300-900, con feature settings avanzados.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  axes: ['SOFT', 'WONK', 'opsz'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
});

/**
 * Inter — Tipografía funcional para cuerpos de texto.
 * Variable weight 300-600, optimizada para legibilidad.
 */
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mecanicorp.com.ve'),
  title: 'MECANICORP C&J C.A — Ingeniería que construye futuro',
  description:
    'Servicios industriales integrales: mantenimiento, instalaciones mecánicas y eléctricas, construcción civil, soldadura certificada. 15+ años de excelencia en Venezuela.',
  keywords: [
    'mecanicorp',
    'servicios industriales',
    'mantenimiento industrial',
    'instalaciones mecánicas',
    'instalaciones eléctricas',
    'construcción civil',
    'soldadura',
    'ingeniería',
    'Venezuela',
    'Valencia',
  ],
  authors: [{ name: 'MECANICORP C&J C.A' }],
  openGraph: {
    title: 'MECANICORP C&J C.A — Precisión que mueve la industria',
    description:
      'Ingeniería de primer nivel para el sector industrial. Cotice su proyecto hoy.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'es_VE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://videos.pexels.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://wa.me" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />

        {/* Metadatos de color del tema */}
        <meta name="theme-color" content="#F6F4F0" />
        <meta name="color-scheme" content="light" />
      </head>
      <body
        className="min-h-screen antialiased"
        style={{
          fontFamily: 'var(--font-body)',
          fontFeatureSettings: '"ss01", "ss02", "cv01"',
        }}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}