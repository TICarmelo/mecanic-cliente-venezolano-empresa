# MECANICORP C&J C.A — Landing MVP

**Ingeniería que construye futuro. Precisión que mueve la industria.**

Landing page de alta gama para empresa de servicios industriales. Estética matizada con texturas cinematográficas, cinética sofisticada y multimedia inmersiva.

---

## 🎯 Visión General

Este MVP transmite **solidez, precisión, confianza y capacidad de ejecución** mediante:

- **Paleta de claros matizados**: grises cálidos, beige técnicos, tonos arena. Sin blancos (#FFFFFF) ni negros (#000000) de fondo.
- **Acentos psicológicos**: naranja industrial (#D96C1A), azul eléctrico (#2B7BE4), verde oliva (#6B8E23), oro antiguo (#C49B5C).
- **Texturas**: ruido cinematográfico (SVG `feTurbulence`), metal cepillado, gradientes cónicos, overlays de óxido.
- **Iluminación dinámica**: `radial-gradient` que sigue al mouse y al scroll, simulando luz de taller.
- **Micro-interacciones sorpresa**: chispas de soldadura al clic, tarjetas con deformación metálica 3D, contadores con splash de números.

---

## 🧬 Stack Tecnológico

| Capa | Tecnología |
|---|---|
| **Framework** | Next.js 15 (App Router, Turbopack) |
| **Lenguaje** | TypeScript (strict mode) |
| **Estilos** | Tailwind CSS 3.4 + `@layer` + 24 CSS custom properties |
| **UI Components** | Custom (basado en shadcn/ui patterns): Button, Card, Input, Badge, Separator |
| **Animaciones macro** | GSAP + ScrollTrigger + `@gsap/react` |
| **Animaciones micro** | Framer Motion 11 |
| **Estado global** | Zustand 5 (`useAnimationStore`) |
| **Partículas** | Canvas API nativa (chispas al clic) |
| **Multimedia** | `next/image`, Unsplash images, Pexels video |
| **Despliegue** | Vercel (`vercel.json` incluido) |

---

## 📂 Estructura del Proyecto

```
├── app/
│   ├── globals.css           # 24 tokens CSS + @layers + texturas
│   ├── layout.tsx            # Root layout (Fraunces + Inter + SEO)
│   ├── page.tsx              # Homepage (composición lazy-loaded)
│   ├── providers.tsx         # Zustand hydration + prefers-reduced-motion
│   └── not-found.tsx
├── components/
│   ├── ui/                   # Button, Card, Input, Badge, Separator
│   ├── layout/               # Navbar (glass→sólido), Footer
│   ├── sections/             # Hero, Servicios, SobreNosotros, Proyectos, Contacto
│   ├── effects/              # NoiseOverlay, DynamicLighting, SparkEffect
│   └── animations/           # (GSAP choreography utilities)
├── hooks/                    # useScrollSpy, useIntersection
├── lib/                      # utils (cn, debounce), constants (datos)
├── store/                    # Zustand animation-store
├── public/                   # images, videos, icons
├── next.config.ts            # remotePatterns, compression, headers
├── tailwind.config.ts        # Paleta, fuentes, animaciones personalizadas
├── vercel.json               # Deploy config, security headers
└── README.md
```

---

## 🚀 Instalación y Desarrollo

### Requisitos previos
- **Node.js** ≥ 22.0.0
- **npm** ≥ 10.0.0

### Instalación

```bash
# 1. Clonar el repositorio
git clone <repo-url> mecanicorp-landing
cd mecanicorp-landing

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo (Turbopack)
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Dev server con Turbopack (HMR rápido) |
| `npm run build` | Build de producción |
| `npm start` | Iniciar servidor de producción |
| `npm run lint` | Análisis estático (ESLint) |
| `npm run type-check` | Verificación de tipos TypeScript |

---

## 🎨 Sistema de Diseño

### Paleta Cromática

| Token | Hex | Uso |
|---|---|---|
| `--surface-primary` | `#F6F4F0` | Fondo general |
| `--surface-alt` | `#F0EEEB` | Secciones alternas |
| `--surface-light` | `#F9F7F4` | Secciones claras |
| `--surface-card` | `#FFFFFF` | Tarjetas (con sombra de color) |
| `--accent-orange` | `#D96C1A` | CTAs, íconos, líneas |
| `--accent-blue` | `#2B7BE4` | Elementos técnicos |
| `--accent-olive` | `#6B8E23` | Construcción, badges |
| `--accent-gold` | `#C49B5C` | Lujo industrial |
| `--text-primary` | `#2C2416` | Texto principal |
| `--text-secondary` | `#6B5E4F` | Texto secundario |

### Tipografía

- **Display**: [Fraunces](https://fonts.google.com/specimen/Fraunces) (variable, 700-900)
- **Body**: [Inter](https://fonts.google.com/specimen/Inter) (variable, 300-600)
- Escala fluida con `clamp()`: Hero `clamp(2.8rem, 8vw, 6.5rem)`

---

## ✨ Características Destacadas

### Hero Section
- Video de fondo (engranajes/mecanizado) con overlay gradiente
- Canvas HUD con datos técnicos flotantes (TORQUE, RPM, PRECISIÓN)
- Coreografía de entrada GSAP: zoom fondo → reveal título → rebote CTA
- CTA con glassmorphism + efecto shimmer
- Partículas de chispas al hacer clic en "Cotizar ahora"

### Servicios
- Grid asimétrico 2 columnas con tarjeta destacada ocupando 2 cols
- Efecto metal-deform 3D al hover (perspective + rotateX/Y)
- Panel lateral deslizante (Framer Motion) con detalles ampliados
- Iconos Lucide con animación hover

### Sobre Nosotros
- Contadores animados con efecto "splash" de partículas numéricas
- Galería masonry con efecto Ken Burns
- Bordes con overlay de óxido simulado

### Proyectos
- Carrusel con transiciones blur + slide
- Efecto lente de aumento al hover
- Dots de navegación con pulso "respiratorio"
- Navegación por teclado (← →)

### Contacto
- Formulario con textura de líneas finas (SVG pattern)
- Inputs con efecto neón azul eléctrico al focus
- Botón submit con chispas y redirección a WhatsApp
- Mapa Google Maps con marcador animado

---

## 🌐 Despliegue en Vercel

1. Conectar repositorio a [Vercel](https://vercel.com).
2. Configurar:
   - **Framework**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
3. Variables de entorno requeridas: **Ninguna** (MVP sin backend).
4. Deploy automático en cada push a `main`.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 🔧 Variables de Entorno

Para el MVP no se requieren variables de entorno. Si se integran APIs en el futuro:

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | API Key de Google Maps |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp para contacto |
| `RESEND_API_KEY` | (Opcional) API Key para envío de emails |

---

## ♿ Accesibilidad

- **WCAG AA**: Contraste suficiente en todos los textos e interacciones.
- **Navegación por teclado**: Todos los elementos interactivos son focusables.
- **`prefers-reduced-motion`**: Las animaciones se desactivan si el usuario lo solicita.
- **ARIA labels**: Secciones, botones y enlaces correctamente etiquetados.
- **Semántica HTML5**: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.

---

## 📄 Licencia

© 2026 TICARMELO Solutions — Todos los derechos reservados.

---

## 👨‍💻 Créditos

**Diseño y desarrollo**: Creado con dirección creativa de élite, ingeniería frontend avanzada y obsesión por el detalle.

**Imágenes**: [Unsplash](https://unsplash.com) — Fotografía industrial de alta calidad.

**Video**: [Pexels](https://pexels.com) — Loop de maquinaria industrial.