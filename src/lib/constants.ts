// ============================================================
// CONFIGURATION DU SITE — MODIFIER PAR CLIENT
// C'est LE fichier à changer pour chaque nouveau projet.
// Tout le site tire ses infos d'ici.
//
// ⚠️ À VALIDER AVEC LE CLIENT : téléphone, e-mail, adresse,
//    domaine, réseaux sociaux. Les valeurs ci-dessous sont
//    des placeholders.
// ============================================================

export const siteConfig = {
  // Identité
  name: "Sola Énergie",
  legalName: "Sola Énergie",
  description:
    "Installateur de panneaux solaires en Île-de-France. Artisan certifié RGE QualiPV, équipes salariées sans sous-traitance, jusqu'à 30 ans de garantie.",
  url: "https://www.sola-energie.fr", // ⚠️ À VALIDER
  // image de partage dédiée, au format 1200x630 attendu par les réseaux
  ogImage: "/og-image.jpg",

  // Contact — ⚠️ À VALIDER
  phone: "01 23 45 67 89",
  phoneHref: "tel:+33123456789",
  email: "contact@sola-energie.fr",
  address: "Île-de-France",

  // Zone d'intervention
  zone: "Île-de-France",

  // Réseaux sociaux
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },

  // Navigation principale
  // NB : ancres préfixées par "/" pour rester cliquables depuis les pages
  // légales (une ancre nue ne mène nulle part hors de la page d'accueil).
  nav: [
    { label: "Nos réalisations", href: "/#realisations" },
    { label: "Avis clients", href: "/#avis" },
    { label: "Comment ça marche", href: "/#process" },
    { label: "FAQ", href: "/#faq" },
  ],

  // CTA principal
  // Le bouton du header ouvre l'entrée générique, qui demande le profil
  cta: {
    text: "Obtenir une estimation",
    href: "/estimation",
  },

  // CTA du hero — une entrée par profil
  ctaProprietaire: "/estimation/proprietaire",
  ctaLocataire: "/estimation/locataire",
} as const;

// ============================================================
// INFORMATIONS LÉGALES — données fournies par le client
//
// Modèle économique : mise en relation. L'éditeur n'exécute pas
// les travaux, il transmet les demandes à des partenaires.
// → pas d'assurance décennale ni de qualification RGE à afficher
//   ici : ces mentions incombent aux partenaires installateurs.
// ============================================================

export const legalConfig = {
  // Nom de domaine tel qu'il doit apparaître dans les mentions légales
  siteDomain: "www.sola-energie.fr", // ⚠️ À VALIDER (domaine définitif du projet)

  // Éditeur du site — société éditrice, identique d'un site à l'autre
  editeur: {
    nom: "INSOMNIAK",
    forme: "SAS (société par actions simplifiée)",
    capital: "50 000 €",
    rcsVille: "Créteil",
    rcsNumero: "817 901 069",
    siege: "18 Rue des Ormes, 94220 Charenton-le-Pont, France",
    tva: "FR46817901069",
    // ⚠️ Adresse de contact PROPRE À CE SITE (ne pas reprendre celle
    //    d'un autre projet édité par INSOMNIAK).
    email: "contact@sola-energie.fr", // ⚠️ À VALIDER
  },

  // ⚠️ MANQUANT : le nom du directeur de la publication est exigé par
  // l'art. 6 III LCEN. Renseigner ici pour l'afficher automatiquement.
  directeurPublication: "",

  // Hébergeur du site
  hebergeur: {
    nom: "Vercel Inc.",
    adresse: "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis",
  },

  // Contact RGPD (DPO si désigné, sinon adresse de contact générique)
  contactRgpd: "contact@sola-energie.fr", // ⚠️ À VALIDER

  // Date affichée en tête des pages légales
  derniereMiseAJour: "13 août 2026",
} as const;

// Couleurs de marque, relevées sur le logo
// (les tokens du site sont en CSS variables dans globals.css)
export const colors = {
  ink: "#3D4F5D", // ardoise du panneau
  inkDeep: "#2C3A45",
  sun: "#F1BD32", // jaune du soleil
  sunSoft: "#F7D97A",
  gold: "#9C6D04", // or lisible sur blanc (4,56:1)
  goldMid: "#C08A0A",
  ice: "#E8EDF1",
  paper: "#F5F6F7",
} as const;
