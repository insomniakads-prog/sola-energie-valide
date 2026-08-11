// ============================================================
// FRAMER MOTION — VARIANTS PARTAGÉS
// Import : import { fadeUp, staggerContainer } from "@/lib/animations";
// ============================================================

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const staggerContainer = (staggerValue = 0.08) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerValue },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Easings de référence :
// Entrances : [0.25, 0.46, 0.45, 0.94] (power3.out)
// Morphs    : [0.45, 0, 0.55, 1]        (power2.inOut)
// Spring    : { type: "spring", stiffness: 300, damping: 20 }
//
// Stagger values :
// Texte     : staggerChildren: 0.08
// Cards     : staggerChildren: 0.15
