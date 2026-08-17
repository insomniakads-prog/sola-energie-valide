import type { Metadata } from "next";
import { EstimationPage } from "@/components/estimation/EstimationPage";

export const metadata: Metadata = {
  title: "Votre estimation de puissance recommandée",
  description:
    "Estimez en moins de 2 minutes la puissance photovoltaïque adaptée à votre logement et l'économie annuelle associée. Gratuit et sans engagement.",
  alternates: { canonical: "/estimation" },
};

// Entrée générique du CTA header : le parcours démarre par « Vous êtes : »
export default function Estimation() {
  return <EstimationPage profil="demander" eyebrow="Votre estimation" />;
}
