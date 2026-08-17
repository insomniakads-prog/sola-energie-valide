// ============================================================
// PARCOURS D'ESTIMATION
//
// Écrans, libellés et options repris du formulaire de référence
// (flow Heyflow « devis-panneaux-solaires ») :
//
//   proprietaire-ou-locataire ─┬─ maison-ou-appartement → superficie
//                              │  → montant-facture → coordonnees-proprietaire
//                              └─ votre-besoin → coordonnees-locataire
//
// Trois entrées, comme la référence :
//   /estimation              → « Vous êtes : » (CTA du header)
//   /estimation/proprietaire → « Vous habitez : » (CTA hero propriétaire)
//   /estimation/locataire    → « Votre besoin »  (CTA hero locataire)
// ============================================================

/** Entrée du parcours, une par URL. */
export type Profil = "demander" | "proprietaire" | "locataire";

/** Visuel affiché entre le titre et les champs, comme sur la référence. */
export type Illustration = "superficie" | "facture" | "contact";

export type Choice = {
  value: string;
  label: string;
  hint?: string;
  /** Icône affichée avec le libellé. */
  icone?: "maison" | "appartement" | "entreprise" | "cle";
  /** Option « Autre » : ouvre un champ libre à la sélection. */
  libre?: boolean;
};

export type Step =
  | {
      id: string;
      kind: "choice";
      question: string;
      /** Libellé au-dessus du groupe d'options (écran facture). */
      label?: string;
      /** Écran « Vous êtes : » : la référence y met le titre avant les pastilles. */
      titreEnPremier?: boolean;
      illustration?: Illustration;
      choices: Choice[];
    }
  | {
      id: string;
      kind: "slider";
      question: string;
      label: string;
      min: number;
      max: number;
      step: number;
      defaut: number;
      unite: string;
      illustration?: Illustration;
    }
  | {
      id: string;
      kind: "contact";
      question: string;
      help?: string;
      avantages?: string[];
      /** Question de qualification posée sous les champs (branche locataire). */
      extra?: { id: string; label: string; choices: Choice[] };
      illustration?: Illustration;
      /** Mention affichée sous les champs, avant le bouton. */
      mention?: string;
      bouton: string;
    };

/* ---------- Écrans ---------- */

const roleStep: Step = {
  id: "role",
  kind: "choice",
  question: "Vous êtes :",
  titreEnPremier: true,
  choices: [
    { value: "proprietaire", label: "Propriétaire", icone: "maison" },
    { value: "locataire", label: "Locataire", icone: "cle" },
  ],
};

const logementStep: Step = {
  id: "logement",
  kind: "choice",
  question: "Vous habitez :",
  choices: [
    { value: "maison", label: "Une maison", icone: "maison" },
    { value: "appartement", label: "Un appartement", icone: "appartement" },
  ],
};

const superficieStep: Step = {
  id: "superficie",
  kind: "slider",
  question: "La superficie de votre maison est de :",
  label: "Nombre de m² :",
  min: 30,
  max: 250,
  step: 1,
  defaut: 105,
  unite: "m²",
  illustration: "superficie",
};

const factureStep: Step = {
  id: "facture",
  kind: "choice",
  question: "Votre facture mensuelle d'électricité est de :",
  label: "Sélectionnez le montant de votre facture :",
  illustration: "facture",
  choices: [
    {
      value: "moins-85",
      label: "Moins de 85 €",
      hint: "Soit un peu plus de 1 000 € par an",
    },
    {
      value: "85-165",
      label: "Entre 85 € et 165 €",
      hint: "Soit entre 1 000 € et 2 000 € par an",
    },
    {
      value: "plus-165",
      label: "Plus de 165 €",
      hint: "Soit plus de 2 000 € par an",
    },
  ],
};

const besoinStep: Step = {
  id: "besoin",
  kind: "choice",
  question: "Dites-nous en plus sur votre besoin :",
  choices: [
    {
      value: "devis",
      label:
        "J'ai un projet d'installation photovoltaïque et je souhaite recevoir un devis",
    },
    { value: "kit", label: "Je souhaite acheter un kit solaire plug and play" },
    { value: "renseignement", label: "Je m'intéresse au photovoltaïque" },
    { value: "emploi", label: "Je recherche un emploi" },
    { value: "autre", label: "Autre", libre: true },
  ],
};

const contactProprietaireStep: Step = {
  id: "contact",
  kind: "contact",
  question: "Obtenez votre estimation gratuite",
  avantages: ["Aides de l'État", "Économies estimées", "Coût du projet"],
  illustration: "contact",
  mention:
    "Ces informations seront traitées UNIQUEMENT par Sola Énergie, dans le cadre de votre projet d'installation de panneaux solaires.",
  bouton: "Obtenir les résultats",
};

const contactLocataireStep: Step = {
  id: "contact",
  kind: "contact",
  question: "Vos coordonnées",
  help: "Nous vous recontacterons dans les plus brefs délais.",
  extra: {
    id: "pourQui",
    label: "C'est pour :",
    choices: [
      { value: "maison", label: "Ma maison", icone: "maison" },
      { value: "entreprise", label: "Mon entreprise", icone: "entreprise" },
    ],
  },
  bouton: "Envoyer",
};

/* ------------------------------------------------------------------
   Parcours — graphe de navigation de la référence.

   Le branchement n'est pas porté par les règles du flow (toutes en
   « navigate-next ») mais par les options elles-mêmes, via leur
   data-destination :

     « Vous êtes : »     Propriétaire   → go: maison-ou-appartement
                         Locataire      → go: votre-besoin
     « Vous habitez : »  Une maison     → next (superficie)
                         Un appartement → go: votre-besoin

   Un appartement bascule donc sur le parcours locataire : sans toiture
   en propre, les questions de surface et de facture n'ont plus d'objet.
   ------------------------------------------------------------------ */

const PARCOURS_PROPRIETAIRE: Step[] = [
  logementStep,
  superficieStep,
  factureStep,
  contactProprietaireStep,
];

const PARCOURS_LOCATAIRE: Step[] = [besoinStep, contactLocataireStep];

export function buildSteps(
  profil: Profil,
  reponses: Record<string, string> = {}
): Step[] {
  if (profil === "locataire") return PARCOURS_LOCATAIRE;

  // Suite du parcours propriétaire : « Un appartement » renvoie sur la
  // branche locataire, faute de toiture en propre.
  const suiteProprietaire =
    reponses.logement === "appartement"
      ? [logementStep, ...PARCOURS_LOCATAIRE]
      : PARCOURS_PROPRIETAIRE;

  if (profil === "proprietaire") return suiteProprietaire;

  // Entrée générique : le premier écran choisit la branche.
  if (reponses.role === "locataire") return [roleStep, ...PARCOURS_LOCATAIRE];
  return [roleStep, ...suiteProprietaire];
}

/* ============================================================
   ESTIMATION DE PUISSANCE
   ⚠️ HYPOTHÈSES À VALIDER — elles pilotent les chiffres affichés.
   Résultat indicatif : les mentions légales précisent qu'il ne
   remplace pas l'étude réalisée après visite technique.
   ============================================================ */

const HYPOTHESES = {
  /** Facture mensuelle retenue par tranche, en € (milieu de tranche). */
  facturesMensuelles: {
    "moins-85": 70,
    "85-165": 125,
    "plus-165": 210,
  } as Record<string, number>,
  /** Prix moyen du kWh TTC. ⚠️ À réviser à chaque évolution du tarif. */
  prixKwh: 0.2516,
  /** Production annuelle par kWc en Île-de-France, orientation moyenne. */
  productionParKwc: 1000,
  /** Part de la consommation visée en autoconsommation. */
  partCouverte: 0.55,
  /** Part de la production réellement autoconsommée. */
  tauxAutoconsommation: 0.7,
  /** Tarif de rachat du surplus (€/kWh). ⚠️ Révisé chaque trimestre. */
  tarifSurplus: 0.04,
  /** Surface de toiture exploitable, en part de la surface habitable. */
  partToitureExploitable: 0.45,
  /** Surface au sol nécessaire par kWc installé (m²). */
  m2ParKwc: 5,
  /** Puissances réellement proposées, en kWc. */
  paliers: [3, 4.5, 6, 7.5, 9, 12],
} as const;

export type Estimation = {
  puissanceMin: number;
  puissanceMax: number;
  productionAnnuelle: number;
  economieAnnuelle: number;
  nbPanneaux: number;
  /** true si la surface de toiture bride la puissance conseillée */
  limiteParToiture: boolean;
};

export function estimer(
  reponses: Record<string, string>
): Estimation | null {
  const facture = HYPOTHESES.facturesMensuelles[reponses.facture];
  if (!facture) return null;

  const consoAnnuelle = (facture * 12) / HYPOTHESES.prixKwh;
  const besoinKwc =
    (consoAnnuelle * HYPOTHESES.partCouverte) / HYPOTHESES.productionParKwc;

  // La toiture peut brider le projet avant le besoin électrique.
  const superficie = Number(reponses.superficie);
  const plafondToiture = superficie
    ? (superficie * HYPOTHESES.partToitureExploitable) / HYPOTHESES.m2ParKwc
    : Infinity;
  const cible = Math.min(besoinKwc, plafondToiture);
  const limiteParToiture = plafondToiture < besoinKwc;

  const paliers = HYPOTHESES.paliers;
  let index = paliers.findIndex((p) => p >= cible);
  if (index === -1) index = paliers.length - 1;
  const puissanceMin = paliers[Math.max(0, index - 1)];
  const puissanceMax = paliers[index];

  const puissanceRef = (puissanceMin + puissanceMax) / 2;
  const productionAnnuelle = Math.round(
    puissanceRef * HYPOTHESES.productionParKwc
  );
  const autoconsommee = productionAnnuelle * HYPOTHESES.tauxAutoconsommation;
  const surplus = productionAnnuelle - autoconsommee;
  const economieAnnuelle = Math.round(
    autoconsommee * HYPOTHESES.prixKwh + surplus * HYPOTHESES.tarifSurplus
  );

  return {
    puissanceMin,
    puissanceMax,
    productionAnnuelle,
    economieAnnuelle,
    nbPanneaux: Math.round(puissanceMax / 0.5), // panneaux de 500 Wc
    limiteParToiture,
  };
}

export const formatKwc = (v: number) =>
  `${v.toString().replace(".", ",")} kWc`;

/** Sur le premier palier, min et max se confondent. */
export const formatFourchette = (min: number, max: number) =>
  min === max ? formatKwc(min) : `${formatKwc(min)} à ${formatKwc(max)}`;

export const formatEuros = (v: number) => `${v.toLocaleString("fr-FR")} €`;
