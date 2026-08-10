'use client';

import { create } from 'zustand';

/**
 * Estado global para animaciones y UI.
 * Gestiona el estado de las animaciones del Hero, navegación,
 * reproducción de video y preferencias de accesibilidad.
 */

interface AnimationState {
  /** Indica si la coreografía de entrada del Hero ha terminado */
  isHeroAnimationComplete: boolean;
  /** Sección actualmente activa (para el navbar) */
  activeSection: string;
  /** Indica si el video del Hero está reproduciéndose */
  isVideoPlaying: boolean;
  /** Respeta preferencias de movimiento reducido */
  prefersReducedMotion: boolean;
  /** Si la página está lista (hidratada) */
  isHydrated: boolean;
  /** Servicio seleccionado en el panel lateral de servicios */
  selectedServiceId: string | null;
  /** Proyecto activo en el carrusel */
  activeProjectIndex: number;

  // Acciones
  setHeroAnimationComplete: (value: boolean) => void;
  setActiveSection: (section: string) => void;
  setVideoPlaying: (playing: boolean) => void;
  setPrefersReducedMotion: (value: boolean) => void;
  setHydrated: (value: boolean) => void;
  setSelectedService: (id: string | null) => void;
  setActiveProjectIndex: (index: number) => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  isHeroAnimationComplete: false,
  activeSection: 'home',
  isVideoPlaying: true,
  prefersReducedMotion: false,
  isHydrated: false,
  selectedServiceId: null,
  activeProjectIndex: 0,

  setHeroAnimationComplete: (value) => set({ isHeroAnimationComplete: value }),
  setActiveSection: (section) => set({ activeSection: section }),
  setVideoPlaying: (playing) => set({ isVideoPlaying: playing }),
  setPrefersReducedMotion: (value) => set({ prefersReducedMotion: value }),
  setHydrated: (value) => set({ isHydrated: value }),
  setSelectedService: (id) => set({ selectedServiceId: id }),
  setActiveProjectIndex: (index) => set({ activeProjectIndex: index }),
}));