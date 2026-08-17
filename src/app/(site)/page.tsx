import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBand } from "@/components/sections/TrustBand";
import { Proximity } from "@/components/sections/Proximity";
import { Certification } from "@/components/sections/Certification";
import { Testimonials } from "@/components/sections/Testimonials";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { siteConfig } from "@/lib/constants";
import {
  FaqJsonLd,
  OrganisationJsonLd,
} from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  // le gabarit du layout ajoute déjà « | Sola Énergie »
  // 59 caractères avec le suffixe du gabarit : sous la coupure de Google
  title: "Installateur panneaux solaires Île-de-France",
  description: siteConfig.description,
  keywords: [
    "artisan certifié panneaux solaires",
    "installateur RGE QualiPV",
    "panneaux solaires Île-de-France",
    "installation photovoltaïque",
    "garantie 30 ans installation solaire",
  ],
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <OrganisationJsonLd />
      <FaqJsonLd />
      <Hero />
      <TrustBand />
      <Proximity />
      <Certification />
      <Testimonials />
      <Process />
      <Faq />
      <FinalCta />
    </>
  );
}
