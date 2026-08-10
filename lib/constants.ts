/**
 * Datos estáticos de MECANICORP C&J C.A — Edición Alta Gama
 * Servicios con precios, proyectos, copys refinados.
 */

export interface ServiceProduct {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  companionImage: string;
  price: string;
  specs: { label: string; value: string }[];
  category: 'mechanical' | 'electrical' | 'civil' | 'welding';
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  stats: { label: string; value: string }[];
}

export interface Counter {
  id: string;
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

// --- Hero: imágenes industriales rotativas (8 imágenes de alta calidad) ---
export const HERO_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&q=90',
    alt: 'Técnico industrial MECANICORP',
  },
  {
    src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=90',
    alt: 'Bombas centrífugas industriales',
  },
  {
    src: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=1920&q=90',
    alt: 'Sistemas de automatización industrial',
  },
  {
    src: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1920&q=90',
    alt: 'Soldadura industrial de precisión',
  },
  {
    src: 'https://images.unsplash.com/photo-1565034946487-077786996e27?w=1920&q=90',
    alt: 'Tableros de control y PLC',
  },
];

// --- Catálogo de productos/servicios (con imágenes acompañantes motion) ---
export const SERVICE_PRODUCTS: ServiceProduct[] = [
  {
    id: 'bombas-centrifugas',
    title: 'Bombas Centrífugas Multietapa',
    tagline: 'Alta eficiencia hidráulica',
    description:
      'Suministro, instalación y mantenimiento de bombas para agua, procesos químicos y petroquímicos. Alineación láser y garantía de 18 meses.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=90',
    companionImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80',
    price: 'Desde $2,850 USD',
    specs: [
      { label: 'Caudal', value: 'Hasta 500 m³/h' },
      { label: 'Presión', value: 'Hasta 40 bar' },
      { label: 'Garantía', value: '18 meses' },
    ],
    category: 'mechanical',
  },
  {
    id: 'tableros-electricos',
    title: 'Tableros Eléctricos Industriales',
    tagline: 'Distribución y control de potencia',
    description:
      'Diseño, fabricación y montaje de tableros BT/MT con protecciones inteligentes y sistema SCADA integrado. Certificación UL e IEC.',
    image: 'https://images.unsplash.com/photo-1565034946487-077786996e27?w=1200&q=90',
    companionImage: 'https://images.unsplash.com/photo-1565034946487-077786996e27?w=400&q=80',
    price: 'Desde $4,200 USD',
    specs: [
      { label: 'Tensión', value: '220V – 13.8kV' },
      { label: 'Protección', value: 'IP65 / NEMA 4X' },
      { label: 'Garantía', value: '24 meses' },
    ],
    category: 'electrical',
  },
  {
    id: 'compresores-industriales',
    title: 'Compresores de Tornillo',
    tagline: 'Aire comprimido sin interrupciones',
    description:
      'Instalación llave en mano con secadores, filtros y tanques. Overhaul cada 8,000 horas con repuestos originales.',
    image: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=1200&q=90',
    companionImage: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=400&q=80',
    price: 'Desde $6,500 USD',
    specs: [
      { label: 'Potencia', value: '15 – 250 HP' },
      { label: 'Caudal', value: 'Hasta 40 m³/min' },
      { label: 'Garantía', value: '12 meses' },
    ],
    category: 'mechanical',
  },
  {
    id: 'estructuras-metalicas',
    title: 'Estructuras Metálicas',
    tagline: 'Ingeniería estructural de precisión',
    description:
      'Fabricación y montaje de acero ASTM A36/A572. Certificación AWS D1.1. Incluye cálculo estructural y pruebas de carga.',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&q=90',
    companionImage: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80',
    price: 'Desde $3,800 USD',
    specs: [
      { label: 'Material', value: 'ASTM A36 / A572' },
      { label: 'Certificación', value: 'AWS D1.1' },
      { label: 'Garantía', value: '36 meses' },
    ],
    category: 'civil',
  },
  {
    id: 'soldadura-industrial',
    title: 'Soldadura Industrial Certificada',
    tagline: 'Uniones bajo norma internacional',
    description:
      'Procesos SMAW, GMAW, GTAW, FCAW. END con ultrasonido y radiografía. Homologación ASME Section IX.',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&q=90',
    companionImage: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400&q=80',
    price: 'Desde $1,950 USD',
    specs: [
      { label: 'Procesos', value: 'SMAW/GMAW/GTAW/FCAW' },
      { label: 'Norma', value: 'ASME IX' },
      { label: 'END', value: 'UT, PT, RT' },
    ],
    category: 'welding',
  },
  {
    id: 'automatizacion-plc',
    title: 'Automatización con PLC',
    tagline: 'Control inteligente de procesos',
    description:
      'PLC Allen-Bradley y Siemens. HMI táctiles, Modbus/ProfiNet. Puesta en marcha y capacitación.',
    image: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=1200&q=90',
    companionImage: 'https://images.unsplash.com/photo-1565034946487-077786996e27?w=400&q=80',
    price: 'Desde $7,800 USD',
    specs: [
      { label: 'PLC', value: 'A-B / Siemens S7' },
      { label: 'Protocolos', value: 'Modbus, ProfiNet' },
      { label: 'Garantía', value: '24 meses' },
    ],
    category: 'electrical',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Modernización Planta de Agua',
    category: 'Ingeniería Mecánica',
    description: 'Reemplazo integral de 12 bombas centrífugas con sistema IoT. Ahorro energético del 28%.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=90',
    stats: [
      { label: 'Ahorro energético', value: '28%' },
      { label: 'Equipos', value: '12' },
      { label: 'Duración', value: '4 meses' },
    ],
  },
  {
    id: 'proj-2',
    title: 'Sistema Eléctrico Refinería',
    category: 'Ingeniería Eléctrica',
    description: 'Distribución 13.8kV, 5MVA, SCADA con 240 puntos de medición.',
    image: 'https://images.unsplash.com/photo-1565034946487-077786996e27?w=1200&q=90',
    stats: [
      { label: 'Potencia', value: '5MVA' },
      { label: 'Puntos', value: '240' },
      { label: 'Duración', value: '6 meses' },
    ],
  },
  {
    id: 'proj-3',
    title: 'Fundaciones Prensa 2000T',
    category: 'Construcción Civil',
    description: 'Bloque de fundación 180m³ para prensa de 2000T. Tolerancia ±2mm.',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&q=90',
    stats: [
      { label: 'Volumen', value: '180m³' },
      { label: 'Tolerancia', value: '±2mm' },
      { label: 'Duración', value: '3 meses' },
    ],
  },
];

// --- Contadores ---
export const COUNTERS: Counter[] = [
  { id: 'years', value: 15, suffix: '+', label: 'Años de experiencia' },
  { id: 'projects', value: 500, suffix: '+', label: 'Proyectos ejecutados' },
  { id: 'clients', value: 120, suffix: '', label: 'Clientes activos', prefix: '+' },
  { id: 'technicians', value: 85, suffix: '+', label: 'Técnicos certificados' },
];

// --- Navegación ---
export const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '#home' },
  { label: 'Catálogo', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
];

// --- Empresa ---
export const COMPANY = {
  name: 'MECANICORP C&J C.A',
  rif: 'J-12345678-9',
  phone: '+58 424-1234567',
  email: 'contacto@mecanicorp.com',
  address: 'Av. Industrial, Zona Industrial Los Gavilanes, Valencia, Edo. Carabobo',
  tagline: 'Ingeniería que construye futuro',
  subtitle: 'Precisión que mueve la industria',
  description:
    'Somos una empresa de servicios industriales integrales con más de 15 años de experiencia en mantenimiento, instalaciones mecánicas y eléctricas, construcción civil, pruebas no destructivas y soldadura especializada. Nuestra misión es garantizar la continuidad operativa y la excelencia técnica en cada proyecto.',
};

// --- Redes ---
export const SOCIAL = {
  instagram: '#',
  linkedin: '#',
  whatsapp: '+584241234567',
};

// --- Hero: copys rotativos ---
export const HERO_COPYS = [
  'Bombas centrífugas, compresores, sistemas de tuberías. Instalación y mantenimiento con precisión de ingeniería.',
  'Tableros eléctricos, automatización PLC, variadores de frecuencia. Potencia que no se detiene.',
  'Estructuras metálicas certificadas, fundaciones industriales, construcción civil de alto estándar.',
  'Soldadura especializada con END. Cumplimos normas AWS, ASME. Uniones que duran toda la vida.',
];