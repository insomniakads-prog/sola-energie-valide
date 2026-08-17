import type { Metadata } from "next";
import { EstimationPage } from "@/components/estimation/EstimationPage";

export const metadata: Metadata = {
  title: "Obtenir une estimation — Propriétaire",
  description:
    "Vous êtes propriétaire : estimez en moins de 2 minutes la puissance photovoltaïque adaptée à votre logement et l'économie annuelle associée.",
  alternates: { canonical: "/estimation/proprietaire" },
  // Variante d'entrée du même parcours : contenu identique à /estimation.
  // Indexer les trois ferait du contenu dupliqué ; celle-ci reste
  // accessible et transmet son jus de lien, mais n'est pas indexée.
  robots: { index: false, follow: true },
};

export default function EstimationProprietaire() {
  return (
    <EstimationPage profil="proprietaire" eyebrow="Estimation propriétaire" />
  );
}
