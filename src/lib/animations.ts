// ============================================================
// FRAMER MOTION — VARIANTS PARTAGÉS
// Import : import { fadeUp, staggerContainer } from "@/lib/animations";
// ============================================================

import type { Variants } from "framer-motion";

// Easing de référence pour les entrées (power3.out)
export const easeOut: [number, number, number, number] = [
  0.25, 0.46, 0.45, 0.94,
];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const staggerContainer = (staggerValue = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerValue },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
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
