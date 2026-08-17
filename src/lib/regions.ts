import type { ReactNode } from "react";

// ============================================================
// DONNÉES PAR RÉGION — pages régionales de Sola Énergie
//
// ⚠️ COMME LE RESTE DU CONTENU DU SITE : avis, chantiers et
//    chiffres sont des placeholders crédibles, à valider/remplacer
//    par les vraies données du client avant mise en ligne.
// ============================================================

export type Testimonial = {
  quote: string;
  initials: string;
  name: string;
  meta: string;
  avatar: "warm" | "navy" | "blue";
  rating: 4 | 5;
};

export type Chantier = {
  ville: string;
  puissance: string;
  departement: string;
  toiture: string;
  image: string;
};

export type RegionFaqZone = {
  reponseTexte: string;
  answer: ReactNode;
};

export type RegionData = {
  slug: string;
  zone: string;
  mapQuery: string;
  mapZoom: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  chantiers: Chantier[];
  testimonials: Testimonial[];
  faqZone: RegionFaqZone;
};

export const regions: RegionData[] = [
  {
    slug: "nord-pas-de-calais",
    zone: "Nord-Pas-de-Calais",
    mapQuery: "Nord-Pas-de-Calais, France",
    mapZoom: 8,
    seo: {
      title: "Installateur panneaux solaires Nord-Pas-de-Calais",
      description:
        "Installateur de panneaux solaires en Nord-Pas-de-Calais. Artisan certifié RGE QualiPV, équipes salariées sans sous-traitance, jusqu'à 30 ans de garantie.",
      keywords: [
        "artisan certifié panneaux solaires",
        "installateur RGE QualiPV",
        "panneaux solaires Nord-Pas-de-Calais",
        "installation photovoltaïque Lille",
        "garantie 30 ans installation solaire",
      ],
    },
    chantiers: [
      { ville: "Lille", puissance: "4,5 kWc", departement: "Nord", toiture: "Tuile mécanique", image: "/chantier-tuile-mecanique-1.jpg" },
      { ville: "Roubaix", puissance: "5 kWc", departement: "Nord", toiture: "Bac acier", image: "/chantier-bac-acier-1.jpg" },
      { ville: "Dunkerque", puissance: "9 kWc", departement: "Nord", toiture: "Ardoise", image: "/chantier-ardoise-1.jpg" },
      { ville: "Calais", puissance: "6 kWc", departement: "Pas-de-Calais", toiture: "Tuile canal", image: "/chantier-tuile-canal-1.jpg" },
      { ville: "Arras", puissance: "8 kWc", departement: "Pas-de-Calais", toiture: "Tuile terre cuite", image: "/chantier-tuile-terre-cuite-1.jpg" },
      { ville: "Tourcoing", puissance: "7 kWc", departement: "Nord", toiture: "Toiture métallique", image: "/chantier-toiture-metallique-1.jpg" },
      { ville: "Douai", puissance: "3,5 kWc", departement: "Nord", toiture: "Tuile plate", image: "/chantier-tuile-plate-1.jpg" },
      { ville: "Valenciennes", puissance: "6 kWc", departement: "Nord", toiture: "Pose en cours", image: "/chantier-pose-en-cours-1.jpg" },
    ],
    testimonials: [
      {
        quote:
          "« Toute l'équipe a été professionnelle du premier rendez-vous à la mise en service : commerciale, démarches administratives, techniciens. C'est gratifiant de voir la consommation du réseau baisser instantanément. »",
        initials: "JD",
        name: "J. Delcroix",
        meta: "9 kWc · Nord",
        avatar: "warm",
        rating: 5,
      },
      {
        quote:
          "« Un interlocuteur unique, un chef de chantier présent le jour de la pose. Au vu du nombre de sociétés douteuses sur ce métier, je recommande. Le devis a mis un peu de temps à arriver, mais le suivi ensuite a été impeccable. »",
        initials: "MV",
        name: "Mathilde V.",
        meta: "Particulier · Pas-de-Calais",
        avatar: "navy",
        rating: 4,
      },
      {
        quote:
          "« L'équipe s'occupe de toutes les démarches administratives (mairie, Enedis, Consuel), ce qui soulage d'un poids. Chantier propre et rapide, on a repris le contrôle sur notre facture d'électricité. »",
        initials: "BL",
        name: "Bruno L.",
        meta: "Particulier · Nord",
        avatar: "blue",
        rating: 5,
      },
    ],
    faqZone: {
      reponseTexte:
        "Nous intervenons dans tout le Nord-Pas-de-Calais (Nord, Pas-de-Calais) et ses départements limitrophes (Somme, Aisne).",
      answer:
        "Nous intervenons dans tout le Nord-Pas-de-Calais (Nord, Pas-de-Calais) et ses départements limitrophes (Somme, Aisne).",
    },
  },
  {
    slug: "picardie",
    zone: "Picardie",
    mapQuery: "Picardie, France",
    mapZoom: 8,
    seo: {
      title: "Installateur panneaux solaires Picardie",
      description:
        "Installateur de panneaux solaires en Picardie. Artisan certifié RGE QualiPV, équipes salariées sans sous-traitance, jusqu'à 30 ans de garantie.",
      keywords: [
        "artisan certifié panneaux solaires",
        "installateur RGE QualiPV",
        "panneaux solaires Picardie",
        "installation photovoltaïque Amiens",
        "garantie 30 ans installation solaire",
      ],
    },
    chantiers: [
      { ville: "Amiens", puissance: "4,5 kWc", departement: "Somme", toiture: "Tuile mécanique", image: "/chantier-tuile-mecanique-1.jpg" },
      { ville: "Beauvais", puissance: "5 kWc", departement: "Oise", toiture: "Bac acier", image: "/chantier-bac-acier-1.jpg" },
      { ville: "Compiègne", puissance: "9 kWc", departement: "Oise", toiture: "Ardoise", image: "/chantier-ardoise-1.jpg" },
      { ville: "Saint-Quentin", puissance: "6 kWc", departement: "Aisne", toiture: "Tuile canal", image: "/chantier-tuile-canal-1.jpg" },
      { ville: "Laon", puissance: "8 kWc", departement: "Aisne", toiture: "Tuile terre cuite", image: "/chantier-tuile-terre-cuite-1.jpg" },
      { ville: "Soissons", puissance: "7 kWc", departement: "Aisne", toiture: "Toiture métallique", image: "/chantier-toiture-metallique-1.jpg" },
      { ville: "Abbeville", puissance: "3,5 kWc", departement: "Somme", toiture: "Tuile plate", image: "/chantier-tuile-plate-1.jpg" },
      { ville: "Creil", puissance: "6 kWc", departement: "Oise", toiture: "Pose en cours", image: "/chantier-pose-en-cours-1.jpg" },
    ],
    testimonials: [
      {
        quote:
          "« Une équipe sérieuse du premier contact à la mise en service. Les démarches administratives ont été prises en charge de bout en bout, on n'a eu qu'à signer. »",
        initials: "CP",
        name: "Christophe P.",
        meta: "8 kWc · Oise",
        avatar: "warm",
        rating: 5,
      },
      {
        quote:
          "« Chantier propre, équipe à l'écoute de nos contraintes esthétiques. Petit bémol : la mise en service Enedis a pris plus de temps que prévu, mais ça ne dépendait pas de l'installateur. »",
        initials: "AF",
        name: "Amandine F.",
        meta: "Particulier · Somme",
        avatar: "navy",
        rating: 4,
      },
      {
        quote:
          "« Trop d'arnaques dans ce secteur, on voulait une entreprise locale et sérieuse. Notre conseiller a suivi le dossier de bout en bout, installation impeccable. »",
        initials: "GT",
        name: "Gérard T.",
        meta: "PV + stockage · Aisne",
        avatar: "blue",
        rating: 5,
      },
    ],
    faqZone: {
      reponseTexte:
        "Nous intervenons dans toute la Picardie (Somme, Oise, Aisne) et ses départements limitrophes (Nord, Pas-de-Calais, Seine-Maritime, Eure, Val-d'Oise, Marne).",
      answer:
        "Nous intervenons dans toute la Picardie (Somme, Oise, Aisne) et ses départements limitrophes (Nord, Pas-de-Calais, Seine-Maritime, Eure, Val-d'Oise, Marne).",
    },
  },
  {
    slug: "normandie",
    zone: "Normandie",
    mapQuery: "Normandie, France",
    mapZoom: 8,
    seo: {
      title: "Installateur panneaux solaires Normandie",
      description:
        "Installateur de panneaux solaires en Normandie. Artisan certifié RGE QualiPV, équipes salariées sans sous-traitance, jusqu'à 30 ans de garantie.",
      keywords: [
        "artisan certifié panneaux solaires",
        "installateur RGE QualiPV",
        "panneaux solaires Normandie",
        "installation photovoltaïque Rouen",
        "garantie 30 ans installation solaire",
      ],
    },
    chantiers: [
      { ville: "Rouen", puissance: "4,5 kWc", departement: "Seine-Maritime", toiture: "Tuile mécanique", image: "/chantier-tuile-mecanique-1.jpg" },
      { ville: "Caen", puissance: "5 kWc", departement: "Calvados", toiture: "Bac acier", image: "/chantier-bac-acier-1.jpg" },
      { ville: "Le Havre", puissance: "9 kWc", departement: "Seine-Maritime", toiture: "Ardoise", image: "/chantier-ardoise-1.jpg" },
      { ville: "Cherbourg", puissance: "6 kWc", departement: "Manche", toiture: "Tuile canal", image: "/chantier-tuile-canal-1.jpg" },
      { ville: "Évreux", puissance: "8 kWc", departement: "Eure", toiture: "Tuile terre cuite", image: "/chantier-tuile-terre-cuite-1.jpg" },
      { ville: "Alençon", puissance: "7 kWc", departement: "Orne", toiture: "Toiture métallique", image: "/chantier-toiture-metallique-1.jpg" },
      { ville: "Dieppe", puissance: "3,5 kWc", departement: "Seine-Maritime", toiture: "Tuile plate", image: "/chantier-tuile-plate-1.jpg" },
      { ville: "Saint-Lô", puissance: "6 kWc", departement: "Manche", toiture: "Pose en cours", image: "/chantier-pose-en-cours-1.jpg" },
    ],
    testimonials: [
      {
        quote:
          "« Proposition commerciale claire, sans pression. Planning respecté, installation impeccable, mise en service immédiate. La production est en ligne avec l'étude annoncée. »",
        initials: "TL",
        name: "Thomas L.",
        meta: "7 kWc · Calvados",
        avatar: "warm",
        rating: 5,
      },
      {
        quote:
          "« Équipe salariée, aucun sous-traitant, ça change tout niveau confiance. Un peu déçue par le délai entre la signature et le début des travaux, mais le résultat est très propre. »",
        initials: "EH",
        name: "Élodie H.",
        meta: "Particulier · Seine-Maritime",
        avatar: "navy",
        rating: 4,
      },
      {
        quote:
          "« L'équipe gère toutes les démarches (mairie, Enedis, Consuel), ce qui soulage énormément. Installation posée et raccordée en une journée. »",
        initials: "PN",
        name: "Patrick N.",
        meta: "Particulier · Manche",
        avatar: "blue",
        rating: 5,
      },
    ],
    faqZone: {
      reponseTexte:
        "Nous intervenons dans toute la Normandie (Seine-Maritime, Calvados, Eure, Manche, Orne) et ses départements limitrophes (Somme, Oise, Val-d'Oise, Yvelines, Eure-et-Loir, Mayenne).",
      answer:
        "Nous intervenons dans toute la Normandie (Seine-Maritime, Calvados, Eure, Manche, Orne) et ses départements limitrophes (Somme, Oise, Val-d'Oise, Yvelines, Eure-et-Loir, Mayenne).",
    },
  },
  {
    slug: "pays-de-la-loire",
    zone: "Pays-de-la-Loire",
    mapQuery: "Pays de la Loire, France",
    mapZoom: 8,
    seo: {
      title: "Installateur panneaux solaires Pays-de-la-Loire",
      description:
        "Installateur de panneaux solaires en Pays-de-la-Loire. Artisan certifié RGE QualiPV, équipes salariées sans sous-traitance, jusqu'à 30 ans de garantie.",
      keywords: [
        "artisan certifié panneaux solaires",
        "installateur RGE QualiPV",
        "panneaux solaires Pays-de-la-Loire",
        "installation photovoltaïque Nantes",
        "garantie 30 ans installation solaire",
      ],
    },
    chantiers: [
      { ville: "Nantes", puissance: "4,5 kWc", departement: "Loire-Atlantique", toiture: "Tuile mécanique", image: "/chantier-tuile-mecanique-1.jpg" },
      { ville: "Angers", puissance: "5 kWc", departement: "Maine-et-Loire", toiture: "Bac acier", image: "/chantier-bac-acier-1.jpg" },
      { ville: "Le Mans", puissance: "9 kWc", departement: "Sarthe", toiture: "Ardoise", image: "/chantier-ardoise-1.jpg" },
      { ville: "Saint-Nazaire", puissance: "6 kWc", departement: "Loire-Atlantique", toiture: "Tuile canal", image: "/chantier-tuile-canal-1.jpg" },
      { ville: "La Roche-sur-Yon", puissance: "8 kWc", departement: "Vendée", toiture: "Tuile terre cuite", image: "/chantier-tuile-terre-cuite-1.jpg" },
      { ville: "Laval", puissance: "7 kWc", departement: "Mayenne", toiture: "Toiture métallique", image: "/chantier-toiture-metallique-1.jpg" },
      { ville: "Cholet", puissance: "3,5 kWc", departement: "Maine-et-Loire", toiture: "Tuile plate", image: "/chantier-tuile-plate-1.jpg" },
      { ville: "Saumur", puissance: "6 kWc", departement: "Maine-et-Loire", toiture: "Pose en cours", image: "/chantier-pose-en-cours-1.jpg" },
    ],
    testimonials: [
      {
        quote:
          "« Nette baisse sur nos dépenses d'électricité, et on n'est qu'en avril. Très bons conseils sur le dimensionnement, chantier propre et demandes esthétiques prises en compte. »",
        initials: "RC",
        name: "Rémi C.",
        meta: "9 kWc + batterie",
        avatar: "warm",
        rating: 5,
      },
      {
        quote:
          "« Un interlocuteur unique du début à la fin, c'est appréciable. La pose a pris un jour de plus que prévu à cause de la météo, mais le travail est très soigné. »",
        initials: "CG",
        name: "Camille G.",
        meta: "Particulier · Loire-Atlantique",
        avatar: "navy",
        rating: 4,
      },
      {
        quote:
          "« Toute l'équipe a été professionnelle, de la commerciale aux techniciens. Gratifiant de voir la consommation du réseau baisser instantanément. »",
        initials: "VM",
        name: "Vincent M.",
        meta: "Photovoltaïque · Maine-et-Loire",
        avatar: "blue",
        rating: 5,
      },
    ],
    faqZone: {
      reponseTexte:
        "Nous intervenons dans toute la région Pays-de-la-Loire (Loire-Atlantique, Maine-et-Loire, Sarthe, Vendée, Mayenne) et ses départements limitrophes (Ille-et-Vilaine, Morbihan, Deux-Sèvres).",
      answer:
        "Nous intervenons dans toute la région Pays-de-la-Loire (Loire-Atlantique, Maine-et-Loire, Sarthe, Vendée, Mayenne) et ses départements limitrophes (Ille-et-Vilaine, Morbihan, Deux-Sèvres).",
    },
  },
  {
    slug: "champagne-ardenne",
    zone: "Champagne-Ardenne",
    mapQuery: "Champagne-Ardenne, France",
    mapZoom: 8,
    seo: {
      title: "Installateur panneaux solaires Champagne-Ardenne",
      description:
        "Installateur de panneaux solaires en Champagne-Ardenne. Artisan certifié RGE QualiPV, équipes salariées sans sous-traitance, jusqu'à 30 ans de garantie.",
      keywords: [
        "artisan certifié panneaux solaires",
        "installateur RGE QualiPV",
        "panneaux solaires Champagne-Ardenne",
        "installation photovoltaïque Reims",
        "garantie 30 ans installation solaire",
      ],
    },
    chantiers: [
      { ville: "Reims", puissance: "4,5 kWc", departement: "Marne", toiture: "Tuile mécanique", image: "/chantier-tuile-mecanique-1.jpg" },
      { ville: "Troyes", puissance: "5 kWc", departement: "Aube", toiture: "Bac acier", image: "/chantier-bac-acier-1.jpg" },
      { ville: "Châlons-en-Champagne", puissance: "9 kWc", departement: "Marne", toiture: "Ardoise", image: "/chantier-ardoise-1.jpg" },
      { ville: "Charleville-Mézières", puissance: "6 kWc", departement: "Ardennes", toiture: "Tuile canal", image: "/chantier-tuile-canal-1.jpg" },
      { ville: "Épernay", puissance: "8 kWc", departement: "Marne", toiture: "Tuile terre cuite", image: "/chantier-tuile-terre-cuite-1.jpg" },
      { ville: "Chaumont", puissance: "7 kWc", departement: "Haute-Marne", toiture: "Toiture métallique", image: "/chantier-toiture-metallique-1.jpg" },
      { ville: "Sedan", puissance: "3,5 kWc", departement: "Ardennes", toiture: "Tuile plate", image: "/chantier-tuile-plate-1.jpg" },
      { ville: "Vitry-le-François", puissance: "6 kWc", departement: "Marne", toiture: "Pose en cours", image: "/chantier-pose-en-cours-1.jpg" },
    ],
    testimonials: [
      {
        quote:
          "« Équipe salariée, chef de chantier présent le jour de la pose. Au vu du nombre de sociétés douteuses sur ce métier, je recommande sans hésiter. »",
        initials: "SB",
        name: "Sébastien B.",
        meta: "8 kWc · Marne",
        avatar: "warm",
        rating: 5,
      },
      {
        quote:
          "« Installation propre et rapide. Le conseiller a bien expliqué le dimensionnement. Le premier rendez-vous technique a été décalé une fois, mais rien de grave. »",
        initials: "NL",
        name: "Nathalie L.",
        meta: "Particulier · Aube",
        avatar: "navy",
        rating: 4,
      },
      {
        quote:
          "« Toutes les démarches administratives ont été prises en charge, y compris l'obligation d'achat du surplus. Travail soigné, on recommande. »",
        initials: "OD",
        name: "Olivier D.",
        meta: "PV + stockage · Ardennes",
        avatar: "blue",
        rating: 5,
      },
    ],
    faqZone: {
      reponseTexte:
        "Nous intervenons dans toute la Champagne-Ardenne (Marne, Aube, Ardennes, Haute-Marne) et ses départements limitrophes (Aisne, Meuse, Yonne).",
      answer:
        "Nous intervenons dans toute la Champagne-Ardenne (Marne, Aube, Ardennes, Haute-Marne) et ses départements limitrophes (Aisne, Meuse, Yonne).",
    },
  },
  {
    slug: "lorraine",
    zone: "Lorraine",
    mapQuery: "Lorraine, France",
    mapZoom: 8,
    seo: {
      title: "Installateur panneaux solaires Lorraine",
      description:
        "Installateur de panneaux solaires en Lorraine. Artisan certifié RGE QualiPV, équipes salariées sans sous-traitance, jusqu'à 30 ans de garantie.",
      keywords: [
        "artisan certifié panneaux solaires",
        "installateur RGE QualiPV",
        "panneaux solaires Lorraine",
        "installation photovoltaïque Nancy",
        "garantie 30 ans installation solaire",
      ],
    },
    chantiers: [
      { ville: "Nancy", puissance: "4,5 kWc", departement: "Meurthe-et-Moselle", toiture: "Tuile mécanique", image: "/chantier-tuile-mecanique-1.jpg" },
      { ville: "Metz", puissance: "5 kWc", departement: "Moselle", toiture: "Bac acier", image: "/chantier-bac-acier-1.jpg" },
      { ville: "Épinal", puissance: "9 kWc", departement: "Vosges", toiture: "Ardoise", image: "/chantier-ardoise-1.jpg" },
      { ville: "Thionville", puissance: "6 kWc", departement: "Moselle", toiture: "Tuile canal", image: "/chantier-tuile-canal-1.jpg" },
      { ville: "Verdun", puissance: "8 kWc", departement: "Meuse", toiture: "Tuile terre cuite", image: "/chantier-tuile-terre-cuite-1.jpg" },
      { ville: "Bar-le-Duc", puissance: "7 kWc", departement: "Meuse", toiture: "Toiture métallique", image: "/chantier-toiture-metallique-1.jpg" },
      { ville: "Forbach", puissance: "3,5 kWc", departement: "Moselle", toiture: "Tuile plate", image: "/chantier-tuile-plate-1.jpg" },
      { ville: "Sarreguemines", puissance: "6 kWc", departement: "Moselle", toiture: "Pose en cours", image: "/chantier-pose-en-cours-1.jpg" },
    ],
    testimonials: [
      {
        quote:
          "« Une nette baisse de nos dépenses d'électricité dès les premiers mois. Très bons conseils sur le dimensionnement, chantier propre. »",
        initials: "FW",
        name: "Franck W.",
        meta: "9 kWc · Moselle",
        avatar: "warm",
        rating: 5,
      },
      {
        quote:
          "« Interlocuteur unique et équipes salariées, exactement ce qu'on cherchait. Un peu long pour obtenir le rendez-vous technique initial, mais l'installation est nickel. »",
        initials: "IK",
        name: "Isabelle K.",
        meta: "Particulier · Meurthe-et-Moselle",
        avatar: "navy",
        rating: 4,
      },
      {
        quote:
          "« Toutes les démarches administratives gérées de A à Z, ça soulage vraiment. Mise en service rapide, production conforme à l'étude. »",
        initials: "HR",
        name: "Hervé R.",
        meta: "Photovoltaïque · Vosges",
        avatar: "blue",
        rating: 5,
      },
    ],
    faqZone: {
      reponseTexte:
        "Nous intervenons dans toute la Lorraine (Meurthe-et-Moselle, Moselle, Vosges, Meuse) et ses départements limitrophes (Marne, Haute-Marne, Haute-Saône, Bas-Rhin).",
      answer:
        "Nous intervenons dans toute la Lorraine (Meurthe-et-Moselle, Moselle, Vosges, Meuse) et ses départements limitrophes (Marne, Haute-Marne, Haute-Saône, Bas-Rhin).",
    },
  },
  {
    slug: "centre",
    zone: "Centre",
    mapQuery: "Centre-Val de Loire, France",
    mapZoom: 8,
    seo: {
      title: "Installateur panneaux solaires région Centre",
      description:
        "Installateur de panneaux solaires en région Centre. Artisan certifié RGE QualiPV, équipes salariées sans sous-traitance, jusqu'à 30 ans de garantie.",
      keywords: [
        "artisan certifié panneaux solaires",
        "installateur RGE QualiPV",
        "panneaux solaires région Centre",
        "installation photovoltaïque Orléans",
        "garantie 30 ans installation solaire",
      ],
    },
    chantiers: [
      { ville: "Orléans", puissance: "4,5 kWc", departement: "Loiret", toiture: "Tuile mécanique", image: "/chantier-tuile-mecanique-1.jpg" },
      { ville: "Tours", puissance: "5 kWc", departement: "Indre-et-Loire", toiture: "Bac acier", image: "/chantier-bac-acier-1.jpg" },
      { ville: "Bourges", puissance: "9 kWc", departement: "Cher", toiture: "Ardoise", image: "/chantier-ardoise-1.jpg" },
      { ville: "Chartres", puissance: "6 kWc", departement: "Eure-et-Loir", toiture: "Tuile canal", image: "/chantier-tuile-canal-1.jpg" },
      { ville: "Blois", puissance: "8 kWc", departement: "Loir-et-Cher", toiture: "Tuile terre cuite", image: "/chantier-tuile-terre-cuite-1.jpg" },
      { ville: "Châteauroux", puissance: "7 kWc", departement: "Indre", toiture: "Toiture métallique", image: "/chantier-toiture-metallique-1.jpg" },
      { ville: "Vierzon", puissance: "3,5 kWc", departement: "Cher", toiture: "Tuile plate", image: "/chantier-tuile-plate-1.jpg" },
      { ville: "Dreux", puissance: "6 kWc", departement: "Eure-et-Loir", toiture: "Pose en cours", image: "/chantier-pose-en-cours-1.jpg" },
    ],
    testimonials: [
      {
        quote:
          "« Proposition claire et détaillée, sans pression commerciale. Planning respecté, installation impeccable, mise en service immédiate. »",
        initials: "AL",
        name: "Alexandre L.",
        meta: "8 kWc · Loiret",
        avatar: "warm",
        rating: 5,
      },
      {
        quote:
          "« Équipe sérieuse et locale, exactement ce qu'on voulait après avoir vu tant d'arnaques sur internet. Léger retard sur la date de pose initiale, mais bien communiqué à l'avance. »",
        initials: "CD",
        name: "Chantal D.",
        meta: "Particulier · Indre-et-Loire",
        avatar: "navy",
        rating: 4,
      },
      {
        quote:
          "« Démarches administratives entièrement prises en charge (mairie, Enedis, Consuel). Chantier propre, techniciens à l'écoute de nos remarques. »",
        initials: "JM",
        name: "Jean-Marc R.",
        meta: "Particulier · Eure-et-Loir",
        avatar: "blue",
        rating: 5,
      },
    ],
    faqZone: {
      reponseTexte:
        "Nous intervenons dans toute la région Centre-Val de Loire (Loiret, Indre-et-Loire, Cher, Eure-et-Loir, Loir-et-Cher, Indre) et ses départements limitrophes (Yonne, Nièvre, Allier, Vienne).",
      answer:
        "Nous intervenons dans toute la région Centre-Val de Loire (Loiret, Indre-et-Loire, Cher, Eure-et-Loir, Loir-et-Cher, Indre) et ses départements limitrophes (Yonne, Nièvre, Allier, Vienne).",
    },
  },
  {
    slug: "aquitaine",
    zone: "Aquitaine",
    mapQuery: "Aquitaine, France",
    mapZoom: 8,
    seo: {
      title: "Installateur panneaux solaires Aquitaine",
      description:
        "Installateur de panneaux solaires en Aquitaine. Artisan certifié RGE QualiPV, équipes salariées sans sous-traitance, jusqu'à 30 ans de garantie.",
      keywords: [
        "artisan certifié panneaux solaires",
        "installateur RGE QualiPV",
        "panneaux solaires Aquitaine",
        "installation photovoltaïque Bordeaux",
        "garantie 30 ans installation solaire",
      ],
    },
    chantiers: [
      { ville: "Bordeaux", puissance: "4,5 kWc", departement: "Gironde", toiture: "Tuile mécanique", image: "/chantier-tuile-mecanique-1.jpg" },
      { ville: "Pau", puissance: "5 kWc", departement: "Pyrénées-Atlantiques", toiture: "Bac acier", image: "/chantier-bac-acier-1.jpg" },
      { ville: "Bayonne", puissance: "9 kWc", departement: "Pyrénées-Atlantiques", toiture: "Ardoise", image: "/chantier-ardoise-1.jpg" },
      { ville: "Périgueux", puissance: "6 kWc", departement: "Dordogne", toiture: "Tuile canal", image: "/chantier-tuile-canal-1.jpg" },
      { ville: "Agen", puissance: "8 kWc", departement: "Lot-et-Garonne", toiture: "Tuile terre cuite", image: "/chantier-tuile-terre-cuite-1.jpg" },
      { ville: "Mont-de-Marsan", puissance: "7 kWc", departement: "Landes", toiture: "Toiture métallique", image: "/chantier-toiture-metallique-1.jpg" },
      { ville: "Arcachon", puissance: "3,5 kWc", departement: "Gironde", toiture: "Tuile plate", image: "/chantier-tuile-plate-1.jpg" },
      { ville: "Mérignac", puissance: "6 kWc", departement: "Gironde", toiture: "Pose en cours", image: "/chantier-pose-en-cours-1.jpg" },
    ],
    testimonials: [
      {
        quote:
          "« Toute l'équipe a été professionnelle du premier rendez-vous à la mise en service. Gratifiant de voir la consommation du réseau baisser instantanément. »",
        initials: "LB",
        name: "Ludovic B.",
        meta: "9 kWc · Gironde",
        avatar: "warm",
        rating: 5,
      },
      {
        quote:
          "« Chef de chantier présent le jour de la pose, équipes salariées, aucun sous-traitant. Le rendez-vous d'étude initial a été décalé d'une semaine, sinon rien à redire. »",
        initials: "MP",
        name: "Marion P.",
        meta: "Particulier · Pyrénées-Atlantiques",
        avatar: "navy",
        rating: 4,
      },
      {
        quote:
          "« L'équipe gère toutes les démarches administratives, ce qui soulage énormément. Installation posée et raccordée en une journée, travail propre. »",
        initials: "SG",
        name: "Stéphane G.",
        meta: "Particulier · Dordogne",
        avatar: "blue",
        rating: 5,
      },
    ],
    faqZone: {
      reponseTexte:
        "Nous intervenons dans toute l'Aquitaine (Gironde, Pyrénées-Atlantiques, Dordogne, Lot-et-Garonne, Landes) et ses départements limitrophes (Gers, Charente-Maritime, Charente).",
      answer:
        "Nous intervenons dans toute l'Aquitaine (Gironde, Pyrénées-Atlantiques, Dordogne, Lot-et-Garonne, Landes) et ses départements limitrophes (Gers, Charente-Maritime, Charente).",
    },
  },
  {
    slug: "bretagne",
    zone: "Bretagne",
    mapQuery: "Bretagne, France",
    mapZoom: 8,
    seo: {
      title: "Installateur panneaux solaires Bretagne",
      description:
        "Installateur de panneaux solaires en Bretagne. Artisan certifié RGE QualiPV, équipes salariées sans sous-traitance, jusqu'à 30 ans de garantie.",
      keywords: [
        "artisan certifié panneaux solaires",
        "installateur RGE QualiPV",
        "panneaux solaires Bretagne",
        "installation photovoltaïque Rennes",
        "garantie 30 ans installation solaire",
      ],
    },
    chantiers: [
      { ville: "Rennes", puissance: "4,5 kWc", departement: "Ille-et-Vilaine", toiture: "Tuile mécanique", image: "/chantier-tuile-mecanique-1.jpg" },
      { ville: "Vannes", puissance: "5 kWc", departement: "Morbihan", toiture: "Bac acier", image: "/chantier-bac-acier-1.jpg" },
      { ville: "Brest", puissance: "9 kWc", departement: "Finistère", toiture: "Ardoise", image: "/chantier-ardoise-1.jpg" },
      { ville: "Saint-Malo", puissance: "6 kWc", departement: "Ille-et-Vilaine", toiture: "Tuile canal", image: "/chantier-tuile-canal-1.jpg" },
      { ville: "Lorient", puissance: "8 kWc", departement: "Morbihan", toiture: "Tuile terre cuite", image: "/chantier-tuile-terre-cuite-1.jpg" },
      { ville: "Quimper", puissance: "7 kWc", departement: "Finistère", toiture: "Toiture métallique", image: "/chantier-toiture-metallique-1.jpg" },
      { ville: "Fougères", puissance: "3,5 kWc", departement: "Ille-et-Vilaine", toiture: "Tuile plate", image: "/chantier-tuile-plate-1.jpg" },
      { ville: "Saint-Brieuc", puissance: "6 kWc", departement: "Côtes-d'Armor", toiture: "Pose en cours", image: "/chantier-pose-en-cours-1.jpg" },
    ],
    testimonials: [
      {
        quote:
          "« Toute l'équipe a été professionnelle du premier rendez-vous à la mise en service : commerciale, démarches administratives, techniciens. C'est gratifiant de voir la consommation du réseau baisser instantanément. »",
        initials: "YL",
        name: "Y. Le Gall",
        meta: "9 kWc · Ille-et-Vilaine",
        avatar: "warm",
        rating: 5,
      },
      {
        quote:
          "« Un interlocuteur unique, un chef de chantier présent le jour de la pose. Au vu du nombre de sociétés douteuses sur ce métier, je recommande. Petit bémol sur le délai de premier rendez-vous, un peu long. »",
        initials: "MG",
        name: "Morgan G.",
        meta: "Particulier · Morbihan",
        avatar: "navy",
        rating: 4,
      },
      {
        quote:
          "« L'équipe s'occupe aussi de toutes les démarches administratives (mairie, Enedis, Consuel), ce qui soulage d'un poids. Installation posée et raccordée en une journée. Travail propre. »",
        initials: "SK",
        name: "Soizic K.",
        meta: "Particulier · Finistère",
        avatar: "blue",
        rating: 5,
      },
    ],
    faqZone: {
      reponseTexte:
        "Nous intervenons dans toute la Bretagne (Ille-et-Vilaine, Morbihan, Finistère, Côtes-d'Armor) et ses départements limitrophes (Loire-Atlantique, Manche, Mayenne).",
      answer:
        "Nous intervenons dans toute la Bretagne (Ille-et-Vilaine, Morbihan, Finistère, Côtes-d'Armor) et ses départements limitrophes (Loire-Atlantique, Manche, Mayenne).",
    },
  },
  {
    slug: "auvergne",
    zone: "Auvergne",
    mapQuery: "Auvergne, France",
    mapZoom: 8,
    seo: {
      title: "Installateur panneaux solaires Auvergne",
      description:
        "Installateur de panneaux solaires en Auvergne. Artisan certifié RGE QualiPV, équipes salariées sans sous-traitance, jusqu'à 30 ans de garantie.",
      keywords: [
        "artisan certifié panneaux solaires",
        "installateur RGE QualiPV",
        "panneaux solaires Auvergne",
        "installation photovoltaïque Clermont-Ferrand",
        "garantie 30 ans installation solaire",
      ],
    },
    chantiers: [
      { ville: "Clermont-Ferrand", puissance: "4,5 kWc", departement: "Puy-de-Dôme", toiture: "Tuile mécanique", image: "/chantier-tuile-mecanique-1.jpg" },
      { ville: "Vichy", puissance: "5 kWc", departement: "Allier", toiture: "Bac acier", image: "/chantier-bac-acier-1.jpg" },
      { ville: "Aurillac", puissance: "9 kWc", departement: "Cantal", toiture: "Ardoise", image: "/chantier-ardoise-1.jpg" },
      { ville: "Moulins", puissance: "6 kWc", departement: "Allier", toiture: "Tuile canal", image: "/chantier-tuile-canal-1.jpg" },
      { ville: "Le Puy-en-Velay", puissance: "8 kWc", departement: "Haute-Loire", toiture: "Tuile terre cuite", image: "/chantier-tuile-terre-cuite-1.jpg" },
      { ville: "Riom", puissance: "7 kWc", departement: "Puy-de-Dôme", toiture: "Toiture métallique", image: "/chantier-toiture-metallique-1.jpg" },
      { ville: "Issoire", puissance: "3,5 kWc", departement: "Puy-de-Dôme", toiture: "Tuile plate", image: "/chantier-tuile-plate-1.jpg" },
      { ville: "Thiers", puissance: "6 kWc", departement: "Puy-de-Dôme", toiture: "Pose en cours", image: "/chantier-pose-en-cours-1.jpg" },
    ],
    testimonials: [
      {
        quote:
          "« Étude sérieuse de notre toiture et de notre consommation, dimensionnement précis. Chantier réalisé en deux jours, équipe très professionnelle. »",
        initials: "DR",
        name: "Didier R.",
        meta: "8 kWc · Puy-de-Dôme",
        avatar: "warm",
        rating: 5,
      },
      {
        quote:
          "« Bon suivi de dossier, un seul interlocuteur du début à la fin. La pose a été repoussée de quelques jours pour cause de météo, mais on a été prévenus à temps. »",
        initials: "VC",
        name: "Valérie C.",
        meta: "Particulier · Allier",
        avatar: "navy",
        rating: 4,
      },
      {
        quote:
          "« Aucune sous-traitance, des techniciens salariés et formés. Toutes les démarches administratives gérées, on n'a eu aucun souci. »",
        initials: "JB",
        name: "Julien B.",
        meta: "Photovoltaïque · Cantal",
        avatar: "blue",
        rating: 5,
      },
    ],
    faqZone: {
      reponseTexte:
        "Nous intervenons dans toute l'Auvergne (Puy-de-Dôme, Allier, Cantal, Haute-Loire) et ses départements limitrophes (Loire, Saône-et-Loire, Nièvre, Corrèze, Lozère, Ardèche).",
      answer:
        "Nous intervenons dans toute l'Auvergne (Puy-de-Dôme, Allier, Cantal, Haute-Loire) et ses départements limitrophes (Loire, Saône-et-Loire, Nièvre, Corrèze, Lozère, Ardèche).",
    },
  },
  {
    slug: "rhone-alpes",
    zone: "Rhône-Alpes",
    mapQuery: "Rhône-Alpes, France",
    mapZoom: 8,
    seo: {
      title: "Installateur panneaux solaires Rhône-Alpes",
      description:
        "Installateur de panneaux solaires en Rhône-Alpes. Artisan certifié RGE QualiPV, équipes salariées sans sous-traitance, jusqu'à 30 ans de garantie.",
      keywords: [
        "artisan certifié panneaux solaires",
        "installateur RGE QualiPV",
        "panneaux solaires Rhône-Alpes",
        "installation photovoltaïque Lyon",
        "garantie 30 ans installation solaire",
      ],
    },
    chantiers: [
      { ville: "Lyon", puissance: "4,5 kWc", departement: "Rhône", toiture: "Tuile mécanique", image: "/chantier-tuile-mecanique-1.jpg" },
      { ville: "Grenoble", puissance: "5 kWc", departement: "Isère", toiture: "Bac acier", image: "/chantier-bac-acier-1.jpg" },
      { ville: "Annecy", puissance: "9 kWc", departement: "Haute-Savoie", toiture: "Ardoise", image: "/chantier-ardoise-1.jpg" },
      { ville: "Saint-Étienne", puissance: "6 kWc", departement: "Loire", toiture: "Tuile canal", image: "/chantier-tuile-canal-1.jpg" },
      { ville: "Chambéry", puissance: "8 kWc", departement: "Savoie", toiture: "Tuile terre cuite", image: "/chantier-tuile-terre-cuite-1.jpg" },
      { ville: "Valence", puissance: "7 kWc", departement: "Drôme", toiture: "Toiture métallique", image: "/chantier-toiture-metallique-1.jpg" },
      { ville: "Villeurbanne", puissance: "3,5 kWc", departement: "Rhône", toiture: "Tuile plate", image: "/chantier-tuile-plate-1.jpg" },
      { ville: "Bourg-en-Bresse", puissance: "6 kWc", departement: "Ain", toiture: "Pose en cours", image: "/chantier-pose-en-cours-1.jpg" },
    ],
    testimonials: [
      {
        quote:
          "« Proposition commerciale claire et détaillée, sans pression. Planning respecté, installation impeccable, mise en service immédiate. »",
        initials: "AT",
        name: "Antoine T.",
        meta: "8 kWc · Rhône",
        avatar: "warm",
        rating: 5,
      },
      {
        quote:
          "« Équipe salariée, aucun sous-traitant sur le chantier, exactement ce qu'on recherchait. Le rendez-vous technique a été décalé une fois, mais rien de bloquant. »",
        initials: "LF",
        name: "Laura F.",
        meta: "Particulier · Isère",
        avatar: "navy",
        rating: 4,
      },
      {
        quote:
          "« Toutes les démarches administratives prises en charge (mairie, Enedis, Consuel). En une journée, l'installation était posée et raccordée. Travail propre. »",
        initials: "NP",
        name: "Nicolas P.",
        meta: "Particulier · Haute-Savoie",
        avatar: "blue",
        rating: 5,
      },
    ],
    faqZone: {
      reponseTexte:
        "Nous intervenons dans toute la région Rhône-Alpes (Rhône, Isère, Loire, Haute-Savoie, Savoie, Drôme, Ain) et ses départements limitrophes (Saône-et-Loire, Ardèche, Vaucluse, Hautes-Alpes).",
      answer:
        "Nous intervenons dans toute la région Rhône-Alpes (Rhône, Isère, Loire, Haute-Savoie, Savoie, Drôme, Ain) et ses départements limitrophes (Saône-et-Loire, Ardèche, Vaucluse, Hautes-Alpes).",
    },
  },
];

export function getRegion(slug: string): RegionData | undefined {
  return regions.find((r) => r.slug === slug);
}
