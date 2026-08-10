import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          primary: '#F6F4F0',
          alt: '#F0EEEB',
          light: '#F9F7F4',
          card: '#FFFFFF',
        },
        border: {
          subtle: '#E8E3DC',
          DEFAULT: '#E8E3DC',
        },
        accent: {
          orange: '#D96C1A',
          blue: '#2B7BE4',
          olive: '#6B8E23',
          gold: '#C49B5C',
        },
        text: {
          primary: '#2C2416',
          secondary: '#6B5E4F',
          muted: '#9B8E7B',
        },
        industrial: {
          steel: '#B8B4AC',
          copper: '#C87D4A',
          rust: '#A0522D',
          cement: '#D5CFC6',
          shadow: 'rgba(200, 170, 140, 0.2)',
        },
        background: '#F6F4F0',
        foreground: '#2C2416',
        primary: {
          DEFAULT: '#D96C1A',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#2B7BE4',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#A0522D',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F0EEEB',
          foreground: '#6B5E4F',
        },
        accent_alt: {
          DEFAULT: '#C49B5C',
          foreground: '#2C2416',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(2.8rem, 8vw, 6.5rem)', { lineHeight: '1.05' }],
        'h2': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.15' }],
        'h3': ['clamp(1.5rem, 3vw, 2.2rem)', { lineHeight: '1.25' }],
        'subtitle': ['clamp(1.2rem, 2.5vw, 1.8rem)', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
      },
      spacing: {
        'section': 'clamp(4rem, 10vh, 8rem)',
        'section-sm': 'clamp(2rem, 6vh, 5rem)',
      },
      borderRadius: {
        'industrial': '4px',
        'card': '12px',
        'button': '6px',
      },
      boxShadow: {
        'industrial': '0 8px 40px rgba(200, 170, 140, 0.2)',
        'industrial-hover': '0 16px 60px rgba(200, 170, 140, 0.35)',
        'card': '0 4px 24px rgba(44, 36, 22, 0.08)',
        'card-hover': '0 12px 40px rgba(44, 36, 22, 0.15)',
        'neon-blue': '0 0 0 2px rgba(43, 123, 228, 0.3)',
        'neon-orange': '0 0 0 2px rgba(217, 108, 26, 0.3)',
        'inner-glow': 'inset 0 0 200px rgba(44, 36, 22, 0.4)',
      },
      backgroundImage: {
        'noise': "url('/textures/noise.svg')",
        'metal-brush': 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(200,170,140,0.06) 2px, rgba(200,170,140,0.06) 4px)',
        'metal-grid': "url('/textures/metal-mesh.svg')",
        'line-pattern': "url('/textures/lines.svg')",
        'industrial-gradient': 'linear-gradient(135deg, #F6F4F0 0%, #F0EEEB 50%, #E8E3DC 100%)',
        'sunrise': 'linear-gradient(180deg, #F9F7F4 0%, rgba(217,108,26,0.08) 50%, #F6F4F0 100%)',
      },
      keyframes: {
        'expand-line': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.05) translate(-1%, -1%)' },
          '100%': { transform: 'scale(1.1) translate(0, 0)' },
        },
        'breathe': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(217,108,26,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(217,108,26,0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'industrial-sunrise': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spark': {
          '0%': { opacity: '1', transform: 'translate(0, 0) scale(1)' },
          '100%': { opacity: '0', transform: 'translate(var(--tx), var(--ty)) scale(0)' },
        },
      },
      animation: {
        'expand-line': 'expand-line 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'ken-burns': 'ken-burns 20s ease-in-out infinite alternate',
        'breathe': 'breathe 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'industrial-sunrise': 'industrial-sunrise 8s ease-in-out infinite',
        'spin-slow': 'spin-slow 30s linear infinite',
        'spark': 'spark 0.6s ease-out forwards',
      },
      backdropBlur: {
        'xs': '2px',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};

export default config;