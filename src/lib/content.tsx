// ============================================================
// CONTENU DE LA LANDING — Sola Énergie
//
// ⚠️ TOUT CE QUI EST MARQUÉ "À VALIDER" EST UN PLACEHOLDER.
//    Chiffres, certifications, avis et chantiers doivent être
//    remplacés par les vraies données du client avant mise en
//    ligne (les données de la page de référence appartiennent
//    à son propriétaire et ne sont pas réutilisables).
// ============================================================

/* ---------- Preuves sociales du hero — ⚠️ À VALIDER ---------- */
export const ratings = [
  { score: "4,9/5", label: "sur 128 avis Google" }, // ⚠️ À VALIDER
  { score: "4,8/5", label: "sur 36 avis Trustpilot" }, // ⚠️ À VALIDER
];

/* ---------- Arguments du hero ---------- */
export const heroPoints = [
  "Installateur certifié RGE QualiPV", // ⚠️ À VALIDER (n° de certification)
  "Équipes salariées — zéro sous-traitance",
  "Jusqu'à 30 ans de garantie produits",
];

/* ---------- Bandeau de confiance — ⚠️ À VALIDER (logos réels) ---------- */
export const trustLogos = [
  { src: "/logo-rge-qualipv.png", alt: "Certification RGE QualiPV" },
  { src: "/logo-rge-qualibat.png", alt: "Certification RGE Qualibat" },
  { src: "/logo-maprimerenov.png", alt: "MaPrimeRénov'" },
  { src: "/logo-cee.png", alt: "Certificats d'économies d'énergie" },
  { src: "/Logo-Marianne.jpg", alt: "Dispositif d'aides de l'État" },
];

/* ---------- Chantiers récents ----------------------------------------
   ⚠️ À REMPLACER : villes, puissances ET photos vont ensemble.

   Photos : banque d'images Pixabay (licence de contenu Pixabay —
   usage commercial autorisé, aucune attribution requise). Ce sont
   des photos de toitures réelles, mais PAS des chantiers du client :
   la section s'intitule « nos chantiers », elles doivent donc être
   remplacées par les vraies photos avant mise en ligne.
   Chaque photo est unique — jamais deux villes sur le même bâtiment.
   -------------------------------------------------------------------- */
export const chantiers = [
  {
    ville: "Sonchamp",
    puissance: "4,5 kWc",
    departement: "Yvelines",
    toiture: "Tuile mécanique",
    image: "/chantier-tuile-mecanique-1.jpg",
  },
  {
    ville: "Plaisir",
    puissance: "5 kWc",
    departement: "Yvelines",
    toiture: "Bac acier",
    image: "/chantier-bac-acier-1.jpg",
  },
  {
    ville: "Savigny-le-Temple",
    puissance: "9 kWc",
    departement: "Seine-et-Marne",
    toiture: "Ardoise",
    image: "/chantier-ardoise-1.jpg",
  },
  {
    ville: "Épinay-sur-Orge",
    puissance: "6 kWc",
    departement: "Essonne",
    toiture: "Tuile canal",
    image: "/chantier-tuile-canal-1.jpg",
  },
  {
    ville: "Maurepas",
    puissance: "8 kWc",
    departement: "Yvelines",
    toiture: "Tuile terre cuite",
    image: "/chantier-tuile-terre-cuite-1.jpg",
  },
  {
    ville: "Vaires-sur-Marne",
    puissance: "7 kWc",
    departement: "Seine-et-Marne",
    toiture: "Toiture métallique",
    image: "/chantier-toiture-metallique-1.jpg",
  },
  {
    ville: "Antony",
    puissance: "3,5 kWc",
    departement: "Hauts-de-Seine",
    toiture: "Tuile plate",
    image: "/chantier-tuile-plate-1.jpg",
  },
  {
    ville: "Chartres",
    puissance: "6 kWc",
    departement: "Eure-et-Loir",
    toiture: "Pose en cours",
    image: "/chantier-pose-en-cours-1.jpg",
  },
];

/* ---------- Avis clients — ⚠️ À VALIDER (placeholders crédibles à
     remplacer par les vrais avis Google/Trustpilot du client) ---------- */
export const testimonials = [
  {
    quote:
      "« Toute l'équipe a été professionnelle du premier rendez-vous à la mise en service : commerciale, démarches administratives, techniciens. C'est gratifiant de voir la consommation du réseau baisser instantanément. »",
    initials: "AM",
    name: "A. et N. Martin", // ⚠️ À VALIDER
    meta: "9 kWc · Yvelines",
    avatar: "warm" as const,
  },
  {
    quote:
      "« Un interlocuteur unique, un chef de chantier présent le jour de la pose et deux poseurs salariés de l'entreprise. Au vu du nombre de sociétés douteuses sur ce métier, je recommande. »",
    initials: "FP",
    name: "Frédéric P.", // ⚠️ À VALIDER
    meta: "Particulier · Essonne",
    avatar: "navy" as const,
  },
  {
    quote:
      "« L'équipe s'occupe aussi de toutes les démarches administratives (mairie, Enedis, Consuel), ce qui soulage d'un poids. En une journée, l'installation était posée et raccordée. Travail propre. »",
    initials: "LK",
    name: "Laurent K.", // ⚠️ À VALIDER
    meta: "Particulier · Val-d'Oise",
    avatar: "blue" as const,
  },
  {
    quote:
      "« Une nette baisse sur nos dépenses d'électricité, et nous ne sommes qu'en avril. Très bons conseils sur le dimensionnement, chantier propre et demandes esthétiques prises en compte. »",
    initials: "MD",
    name: "M. Delaunay", // ⚠️ À VALIDER
    meta: "9 kWc + batterie",
    avatar: "warm" as const,
  },
  {
    quote:
      "« Proposition commerciale claire et détaillée, sans pression. Planning respecté, installation impeccable, mise en service immédiate. La production est en ligne avec l'étude annoncée. »",
    initials: "PJ",
    name: "Pierre-J. Maisonneuve", // ⚠️ À VALIDER
    meta: "Photovoltaïque · Seine-et-Marne",
    avatar: "navy" as const,
  },
  {
    quote:
      "« Trop d'arnaques sur internet dans ce secteur. Je voulais une entreprise locale, sérieuse et à l'écoute. Mon conseiller a suivi le projet de bout en bout. Mise en œuvre soignée. »",
    initials: "DT",
    name: "Daniel T.", // ⚠️ À VALIDER
    meta: "PV + stockage · Yvelines",
    avatar: "blue" as const,
  },
];

/* ---------- Parcours en 5 étapes ---------- */
export const processSteps = [
  {
    num: "01",
    title: "Étude du projet",
    text: "Analyse de votre consommation, de votre toiture et de votre budget. Dimensionnement précis et matériel préconisé.",
  },
  {
    num: "02",
    title: "Visite technique",
    text: "Un technicien vient sur place vérifier la faisabilité et finaliser l'implantation. On confirme le devis.",
  },
  {
    num: "03",
    title: "Démarches administratives",
    text: "Déclaration en mairie, Enedis, Consuel, aides et obligation d'achat : nos équipes gèrent l'ensemble.",
  },
  {
    num: "04",
    title: "Installation",
    text: "Pose réalisée par nos équipes salariées, en 1 à 3 jours selon la taille du chantier. Sans sous-traitance.",
  },
  {
    num: "05",
    title: "Suivi de performance",
    text: "Monitoring de production, optimisation et SAV dédié. On reste à vos côtés sur le long terme.",
  },
];

/* ---------- FAQ — ⚠️ À VALIDER (chiffres et partenariats) ---------- */
export const faq = [
  {
    num: "01",
    question: "Comment savoir si je peux vous faire confiance ?",
    // version texte pour le JSON-LD (la réponse affichée est du JSX)
    reponseTexte:
      "Des centaines d'installations réalisées en Île-de-France, une note de 4,9/5 sur 128 avis Google et 4,8/5 sur 36 avis Trustpilot. Nous sommes certifiés RGE QualiPV, couverts par une assurance décennale, et nos équipes de pose sont salariées de l'entreprise — aucun sous-traitant sur vos chantiers.",
    answer: (
      <>
        Des centaines d&apos;installations réalisées en Île-de-France, une note de{" "}
        <strong>4,9/5 sur 128 avis Google</strong> et{" "}
        <strong>4,8/5 sur 36 avis Trustpilot</strong>. Nous sommes certifiés{" "}
        <strong>RGE QualiPV</strong>, couverts par une{" "}
        <strong>assurance décennale</strong>, et nos équipes de pose sont
        salariées de l&apos;entreprise — aucun sous-traitant sur vos chantiers.
      </>
    ),
  },
  {
    num: "02",
    question: "Quelles sont vos certifications et labels ?",
    // version texte pour le JSON-LD (la réponse affichée est du JSX)
    reponseTexte:
      "Nous cumulons plusieurs reconnaissances : RGE QualiPV pour le photovoltaïque, QualiPAC pour les pompes à chaleur, ainsi que les agréments constructeurs nécessaires pour vous faire bénéficier des garanties produits étendues. La certification RGE conditionne votre accès aux aides de l'État et à l'obligation d'achat du surplus.",
    answer: (
      <>
        Nous cumulons plusieurs reconnaissances : <strong>RGE QualiPV</strong>{" "}
        pour le photovoltaïque, <strong>QualiPAC</strong> pour les pompes à
        chaleur, ainsi que les agréments constructeurs nécessaires pour vous
        faire bénéficier des <strong>garanties produits étendues</strong>. La
        certification RGE conditionne votre accès aux aides de l&apos;État et à
        l&apos;obligation d&apos;achat du surplus.
      </>
    ),
  },
  {
    num: "03",
    question: "Quelle est votre zone d'intervention ?",
    // version texte pour le JSON-LD (la réponse affichée est du JSX)
    reponseTexte:
      "Nous intervenons dans toute l'Île-de-France (Yvelines, Hauts-de-Seine, Essonne, Val-de-Marne, Seine-et-Marne, Seine-Saint-Denis, Val-d'Oise, Paris) et ses départements limitrophes (Eure, Eure-et-Loir, Loiret, Yonne, Aube, Marne, Aisne, Oise).",
    answer: (
      <>
        Nous intervenons dans toute l&apos;<strong>Île-de-France</strong>{" "}
        (Yvelines, Hauts-de-Seine, Essonne, Val-de-Marne, Seine-et-Marne,
        Seine-Saint-Denis, Val-d&apos;Oise, Paris) et ses{" "}
        <strong>départements limitrophes</strong> (Eure, Eure-et-Loir, Loiret,
        Yonne, Aube, Marne, Aisne, Oise).
      </>
    ),
  },
  {
    num: "04",
    question: "Quelles sont les garanties d'une installation ?",
    // version texte pour le JSON-LD (la réponse affichée est du JSX)
    reponseTexte:
      "Vos installations bénéficient de nombreuses garanties : garantie décennale (10 ans en cas de dommage compromettant la solidité du bâti), garantie biennale (2 ans sur les éléments d'équipement), garantie de parfait achèvement, et garanties produits jusqu'à 30 ans selon la gamme. Notre SAV est réactif, avec un interlocuteur dédié.",
    answer: (
      <>
        Vos installations bénéficient de nombreuses garanties :{" "}
        <strong>garantie décennale</strong> (10 ans en cas de dommage
        compromettant la solidité du bâti), <strong>garantie biennale</strong>{" "}
        (2 ans sur les éléments d&apos;équipement),{" "}
        <strong>garantie de parfait achèvement</strong> (réparation de tout
        désordre signalé à la réception), et <strong>garanties produits</strong>{" "}
        jusqu&apos;à 30 ans selon la gamme. Notre SAV est réactif, avec un
        interlocuteur dédié.
      </>
    ),
  },
  {
    num: "05",
    question: "Quelles solutions proposez-vous ?",
    // version texte pour le JSON-LD (la réponse affichée est du JSX)
    reponseTexte:
      "Nous réalisons des installations photovoltaïques de 2 kWc à 500 kWc, sur tous types de toitures (tuiles mécaniques, tuiles plates, toitures terrasses, zinc, ardoise, bac acier) et sur tous types de bâtiments (maisons, immeubles, bâtiments commerciaux et industriels, hangars agricoles, ombrières, carports). Nous installons également des batteries physiques ou virtuelles, des bornes de recharge, des pompes à chaleur et ballons thermodynamiques.",
    answer: (
      <>
        Nous réalisons des installations photovoltaïques de{" "}
        <strong>2 kWc à 500 kWc</strong>, sur tous types de toitures (tuiles
        mécaniques, tuiles plates, toitures terrasses, zinc, ardoise, bac acier)
        et sur tous types de bâtiments (maisons, immeubles, bâtiments
        commerciaux et industriels, hangars agricoles, ombrières, carports).
        Nous installons également des{" "}
        <strong>batteries physiques ou virtuelles</strong>, des{" "}
        <strong>bornes de recharge</strong>, des{" "}
        <strong>pompes à chaleur</strong> et{" "}
        <strong>ballons thermodynamiques</strong>.
      </>
    ),
  },
  {
    num: "06",
    question: "Faites-vous appel à la sous-traitance ?",
    // version texte pour le JSON-LD (la réponse affichée est du JSX)
    reponseTexte:
      "Aucune sous-traitance, jamais. Toutes nos installations sont réalisées par nos équipes salariées, formées et auditées en interne. C'est l'une des raisons pour lesquelles nos clients nous font confiance : un seul interlocuteur, de l'étude à la mise en service, et une équipe qui maîtrise chaque étape.",
    answer: (
      <>
        <strong>Aucune sous-traitance, jamais.</strong> Toutes nos installations
        sont réalisées par nos équipes salariées, formées et auditées en
        interne. C&apos;est l&apos;une des raisons pour lesquelles nos clients
        nous font confiance : un seul interlocuteur, de l&apos;étude à la mise
        en service, et une équipe qui maîtrise chaque étape.
      </>
    ),
  },
];
