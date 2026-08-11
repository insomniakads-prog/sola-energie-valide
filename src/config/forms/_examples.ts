/**
 * Exemples de configurations de formulaires par secteur
 * -------------------------------------------------------
 * Copier dans : src/config/forms/[secteur].ts
 * Importer dans ta page : import { SOLAR_STEPS } from "@/config/forms/solar"
 *
 * Usage :
 *   <MultiStepForm
 *     steps={SOLAR_STEPS}
 *     apiEndpoint="/api/leads/solaire"
 *     redirectUrl="/merci-solaire"
 *     accentColor="#F59F0A"
 *     ctaLabel="Obtenir mon étude gratuite"
 *   />
 */

import { StepConfig } from "@/components/sections/MultiStepForm";

// ─────────────────────────────────────────────────────────────
// SOLAIRE — Panneaux photovoltaïques
// ─────────────────────────────────────────────────────────────
export const SOLAR_STEPS: StepConfig[] = [
  {
    type: "cards",
    field: "type_habitation",
    question: "Quel est votre type d'habitation ?",
    options: [
      { value: "maison", emoji: "🏠", label: "Maison" },
      {
        value: "appartement",
        emoji: "🏢",
        label: "Appartement",
        ineligible: true,
        ineligibleMessage:
          "Désolé, les panneaux solaires nécessitent une toiture individuelle.",
      },
    ],
  },
  {
    type: "cards",
    field: "proprietaire",
    question: "Êtes-vous propriétaire de votre logement ?",
    options: [
      { value: "proprietaire", emoji: "🔑", label: "Propriétaire" },
      {
        value: "locataire",
        emoji: "📋",
        label: "Locataire",
        ineligible: true,
        ineligibleMessage:
          "Désolé, cette aide nécessite d'être propriétaire de votre logement.",
      },
    ],
  },
  {
    type: "cards",
    field: "facture_mensuelle",
    question: "Combien payez-vous d'électricité par mois ?",
    subtitle: "Cette information nous permet d'estimer vos économies",
    columns: 2,
    options: [
      { value: "0-50", emoji: "💡", label: "0 à 50€", sublabel: "par mois" },
      { value: "50-100", emoji: "⚡", label: "50 à 100€", sublabel: "par mois" },
      { value: "100-200", emoji: "🔌", label: "100 à 200€", sublabel: "par mois" },
      { value: "200+", emoji: "🔥", label: "Plus de 200€", sublabel: "par mois" },
    ],
  },
  {
    type: "inputs-address",
    question: "Vos coordonnées",
    subtitle: "Nécessaire pour calculer le montant des aides de votre région",
  },
  {
    type: "inputs-contact",
    question: "Dernière étape !",
    subtitle: "Un conseiller vous contactera pour confirmer votre éligibilité",
  },
];

// ─────────────────────────────────────────────────────────────
// ITE — Isolation Thermique par l'Extérieur
// ─────────────────────────────────────────────────────────────
export const ITE_STEPS: StepConfig[] = [
  {
    type: "cards",
    field: "proprietaire",
    question: "Êtes-vous propriétaire de votre logement ?",
    options: [
      { value: "proprietaire", emoji: "🔑", label: "Propriétaire" },
      {
        value: "locataire",
        emoji: "📋",
        label: "Locataire",
        ineligible: true,
        ineligibleMessage:
          "L'isolation thermique par l'extérieur nécessite d'être propriétaire.",
      },
    ],
  },
  {
    type: "cards",
    field: "type_habitation",
    question: "Quel est votre type d'habitation ?",
    options: [
      { value: "maison", emoji: "🏠", label: "Maison" },
      {
        value: "appartement",
        emoji: "🏢",
        label: "Appartement",
        ineligible: true,
        ineligibleMessage:
          "L'ITE est réservée aux maisons individuelles.",
      },
    ],
  },
  {
    type: "cards",
    field: "type_chauffage",
    question: "Quel est votre mode de chauffage principal ?",
    subtitle: "Cette information nous aide à estimer vos économies potentielles",
    columns: 2,
    options: [
      { value: "gaz", emoji: "🔥", label: "Gaz" },
      { value: "fioul", emoji: "🛢️", label: "Fioul" },
      { value: "electrique", emoji: "⚡", label: "Électrique" },
      { value: "autre", emoji: "🌡️", label: "Autre", sublabel: "(PAC, bois...)" },
    ],
  },
  {
    type: "inputs-address",
    question: "Vos coordonnées",
    subtitle: "Nécessaire pour calculer le montant des aides de votre région",
  },
  {
    type: "inputs-contact",
    question: "Dernière étape !",
    subtitle: "Un conseiller vous contactera pour confirmer votre éligibilité",
  },
];

// ─────────────────────────────────────────────────────────────
// PAC — Pompe à Chaleur
// ─────────────────────────────────────────────────────────────
export const PAC_STEPS: StepConfig[] = [
  {
    type: "cards",
    field: "proprietaire",
    question: "Êtes-vous propriétaire de votre logement ?",
    options: [
      { value: "proprietaire", emoji: "🔑", label: "Propriétaire" },
      {
        value: "locataire",
        emoji: "📋",
        label: "Locataire",
        ineligible: true,
        ineligibleMessage:
          "L'installation d'une PAC nécessite d'être propriétaire.",
      },
    ],
  },
  {
    type: "cards",
    field: "type_habitation",
    question: "Quel est votre type d'habitation ?",
    options: [
      { value: "maison", emoji: "🏠", label: "Maison" },
      {
        value: "appartement",
        emoji: "🏢",
        label: "Appartement",
        ineligible: true,
        ineligibleMessage: "Les PAC air-eau sont réservées aux maisons individuelles.",
      },
    ],
  },
  {
    type: "cards",
    field: "type_chauffage_actuel",
    question: "Quel est votre chauffage actuel ?",
    subtitle: "Nous estimons vos économies potentielles",
    options: [
      { value: "gaz", emoji: "🔥", label: "Gaz" },
      { value: "fioul", emoji: "🛢️", label: "Fioul" },
      { value: "electrique", emoji: "⚡", label: "Électrique" },
      { value: "autre", emoji: "🌡️", label: "Autre" },
    ],
  },
  {
    type: "cards",
    field: "surface_habitable",
    question: "Quelle est la surface de votre logement ?",
    options: [
      { value: "0-80", emoji: "🏡", label: "Moins de 80m²" },
      { value: "80-120", emoji: "🏠", label: "80 à 120m²" },
      { value: "120-180", emoji: "🏘️", label: "120 à 180m²" },
      { value: "180+", emoji: "🏰", label: "Plus de 180m²" },
    ],
  },
  {
    type: "inputs-address",
    question: "Vos coordonnées",
    subtitle: "Nécessaire pour calculer le montant des aides",
  },
  {
    type: "inputs-contact",
    question: "Dernière étape !",
    subtitle: "Un conseiller vous contactera pour confirmer votre éligibilité",
  },
];

// ─────────────────────────────────────────────────────────────
// COMBLES — Isolation des combles
// ─────────────────────────────────────────────────────────────
export const COMBLES_STEPS: StepConfig[] = [
  {
    type: "cards",
    field: "proprietaire",
    question: "Êtes-vous propriétaire de votre logement ?",
    options: [
      { value: "proprietaire", emoji: "🔑", label: "Propriétaire" },
      {
        value: "locataire",
        emoji: "📋",
        label: "Locataire",
        ineligible: true,
        ineligibleMessage:
          "L'isolation des combles nécessite d'être propriétaire.",
      },
    ],
  },
  {
    type: "cards",
    field: "type_habitation",
    question: "Quel est votre type d'habitation ?",
    options: [
      { value: "maison", emoji: "🏠", label: "Maison" },
      { value: "appartement", emoji: "🏢", label: "Appartement", sublabel: "(dernier étage)" },
    ],
  },
  {
    type: "cards",
    field: "type_combles",
    question: "Quel type de combles avez-vous ?",
    options: [
      { value: "perdus", emoji: "🏚️", label: "Combles perdus", sublabel: "Non aménageables" },
      { value: "amenageables", emoji: "🏡", label: "Aménageables", sublabel: "Ou déjà aménagés" },
    ],
  },
  {
    type: "cards",
    field: "surface_combles",
    question: "Quelle est la surface de vos combles ?",
    options: [
      { value: "0-50", emoji: "📐", label: "Moins de 50m²" },
      { value: "50-80", emoji: "📏", label: "50 à 80m²" },
      { value: "80-120", emoji: "🏠", label: "80 à 120m²" },
      { value: "120+", emoji: "🏡", label: "Plus de 120m²" },
    ],
  },
  {
    type: "inputs-address",
    question: "Vos coordonnées",
    subtitle: "Nécessaire pour calculer le montant des aides",
  },
  {
    type: "inputs-contact",
    question: "Dernière étape !",
    subtitle: "Un conseiller vous contactera pour confirmer votre éligibilité",
  },
];

// ─────────────────────────────────────────────────────────────
// GÉNÉRIQUE — Template vide à dupliquer
// ─────────────────────────────────────────────────────────────
export const GENERIC_STEPS: StepConfig[] = [
  {
    type: "cards",
    field: "statut",
    question: "Votre question ici ?",
    options: [
      { value: "option_a", emoji: "✅", label: "Option A" },
      { value: "option_b", emoji: "❌", label: "Option B", ineligible: true, ineligibleMessage: "Message d'inéligibilité" },
    ],
  },
  {
    type: "inputs-address",
    question: "Vos coordonnées",
    subtitle: "Sous-titre optionnel",
  },
  {
    type: "inputs-contact",
    question: "Dernière étape !",
    subtitle: "Un conseiller vous contactera rapidement",
  },
];
