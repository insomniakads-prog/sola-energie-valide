/**
 * Illustrations des écrans du parcours.
 *
 * Le formulaire de référence place un visuel centré entre le titre et les
 * champs sur trois écrans (superficie, facture, coordonnées). On reprend
 * l'emplacement et le rôle de chacun, redessinés aux couleurs de la marque —
 * les fichiers d'origine appartiennent à leur éditeur.
 */

const SUN = "#F1BD32";
const INK = "#3D4F5D";
const ICE = "#E8EDF1";

/** Écran superficie : volume de la maison et flèches de cotation. */
export function IllustrationSuperficie() {
  return (
    <svg viewBox="0 0 220 150" role="img" aria-label="Superficie du logement" className="h-[130px] w-auto">
      <path d="M40 70 110 34l70 36v56H40z" fill="#fff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M30 72 110 30l80 42" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="60" y="86" width="26" height="22" rx="3" fill={SUN} />
      <rect x="134" y="86" width="26" height="22" rx="3" fill={SUN} />
      <rect x="98" y="92" width="24" height="34" rx="3" fill={ICE} stroke={INK} strokeWidth="2" />
      {/* cotation horizontale */}
      <path d="M40 140h140" stroke={SUN} strokeWidth="4" strokeLinecap="round" />
      <path d="m46 134-8 6 8 6M174 134l8 6-8 6" fill="none" stroke={SUN} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* cotation verticale */}
      <path d="M20 44v82" stroke={SUN} strokeWidth="4" strokeLinecap="round" />
      <path d="m14 50 6-8 6 8M14 120l6 8 6-8" fill="none" stroke={SUN} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Écran facture : une facture d'électricité tenue en main. */
export function IllustrationFacture() {
  return (
    <svg viewBox="0 0 220 150" role="img" aria-label="Facture d'électricité" className="h-[130px] w-auto">
      <rect x="52" y="16" width="116" height="118" rx="6" fill="#fff" stroke={INK} strokeWidth="3" />
      <rect x="66" y="32" width="46" height="8" rx="4" fill={INK} opacity=".5" />
      <rect x="66" y="50" width="88" height="6" rx="3" fill={ICE} />
      <rect x="66" y="64" width="72" height="6" rx="3" fill={ICE} />
      <rect x="66" y="78" width="88" height="6" rx="3" fill={ICE} />
      <rect x="66" y="98" width="56" height="20" rx="4" fill={SUN} />
      <path d="M138 100l-8 12h7l-3 10 11-14h-7z" fill={INK} />
    </svg>
  );
}

/** Écran coordonnées : l'aperçu du rapport que le visiteur va recevoir. */
export function IllustrationRapport() {
  return (
    <svg viewBox="0 0 220 150" role="img" aria-label="Aperçu de votre estimation" className="h-[130px] w-auto">
      <rect x="14" y="26" width="120" height="96" rx="8" fill="#fff" stroke={ICE} strokeWidth="3" />
      <rect x="72" y="14" width="134" height="112" rx="8" fill="#fff" stroke={INK} strokeWidth="3" />
      <rect x="86" y="28" width="60" height="7" rx="3.5" fill={INK} opacity=".55" />
      <rect x="86" y="44" width="106" height="6" rx="3" fill={ICE} />
      {/* histogramme */}
      <rect x="86" y="96" width="14" height="18" rx="2" fill={ICE} />
      <rect x="106" y="84" width="14" height="30" rx="2" fill={ICE} />
      <rect x="126" y="72" width="14" height="42" rx="2" fill={SUN} />
      <rect x="146" y="62" width="14" height="52" rx="2" fill={SUN} />
      <rect x="166" y="52" width="14" height="62" rx="2" fill={SUN} />
    </svg>
  );
}

export const ILLUSTRATIONS = {
  superficie: IllustrationSuperficie,
  facture: IllustrationFacture,
  contact: IllustrationRapport,
} as const;
