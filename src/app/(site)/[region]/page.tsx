import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { regions, getRegion } from "@/lib/regions";
import { buildFaq } from "@/lib/content";
import { Hero } from "@/components/sections/Hero";
import { TrustBand } from "@/components/sections/TrustBand";
import { Proximity } from "@/components/sections/Proximity";
import { Certification } from "@/components/sections/Certification";
import { Testimonials } from "@/components/sections/Testimonials";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import {
  OrganisationJsonLd,
  FaqJsonLd,
  LocalBusinessJsonLd,
  BreadcrumbListJsonLd,
} from "@/components/seo/StructuredData";

export function generateStaticParams() {
  return regions.map((r) => ({ region: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region: slug } = await params;
  const region = getRegion(slug);
  if (!region) return {};

  return {
    title: region.seo.title,
    description: region.seo.description,
    keywords: region.seo.keywords,
    alternates: { canonical: `/${region.slug}` },
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region: slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();

  const faqItems = buildFaq(region.faqZone);

  return (
    <>
      <OrganisationJsonLd zone={region.zone} />
      <FaqJsonLd items={faqItems} />
      <LocalBusinessJsonLd zone={region.zone} />
      <BreadcrumbListJsonLd zone={region.zone} slug={region.slug} />
      <Hero
        zone={region.zone}
      />
      <TrustBand />
      <Proximity
        zone={region.zone}
        mapQuery={region.mapQuery}
        mapZoom={region.mapZoom}
        chantiers={region.chantiers}
      />
      <Certification />
      <Testimonials testimonials={region.testimonials} />
      <Process />
      <Faq items={faqItems} />
      <FinalCta />
    </>
  );
}
