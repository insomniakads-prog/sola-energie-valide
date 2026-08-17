import type { Metadata } from "next";
import { EstimationPage } from "@/components/estimation/EstimationPage";

export const metadata: Metadata = {
  title: "Obtenir une estimation — Locataire",
  description:
    "Vous êtes locataire : découvrez les solutions solaires accessibles et l'économie possible sur votre facture d'électricité.",
  alternates: { canonical: "/estimation/locataire" },
  // Variante d'entrée du même parcours : contenu identique à /estimation.
  // Indexer les trois ferait du contenu dupliqué ; celle-ci reste
  // accessible et transmet son jus de lien, mais n'est pas indexée.
  robots: { index: false, follow: true },
};

export default function EstimationLocataire() {
  return <EstimationPage profil="locataire" eyebrow="Estimation locataire" />;
}
