// ============================================================
// CONFIGURATION DU SITE — MODIFIER PAR CLIENT
// C'est LE fichier à changer pour chaque nouveau projet.
// Tout le site tire ses infos d'ici.
// ============================================================

export const siteConfig = {
  // Identité
  name: "[Nom du Client]",
  description: "[Description courte pour SEO — 150-160 caractères]",
  url: "https://www.example.com",
  ogImage: "/images/og-image.jpg",

  // Contact
  phone: "01 23 45 67 89",
  email: "contact@example.com",
  address: "123 Rue Example, 75001 Paris",

  // Réseaux sociaux
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },

  // Navigation principale
  nav: [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Témoignages", href: "/#temoignages" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/contact" },
  ],

  // CTA principal
  cta: {
    text: "Demandez votre devis gratuit",
    href: "/contact",
  },
} as const;

// Couleurs accessibles depuis le code
// (les vraies couleurs sont en CSS variables dans globals.css)
export const colors = {
  primary: "#1E40AF",
  secondary: "#F59E0B",
  accent: "#10B981",
} as const;
