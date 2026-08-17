import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/constants";

/**
 * Bloc "Reconnaissance" — carte ardoise, texte à gauche / image à droite.
 * ⚠️ À VALIDER : distinctions et certifications réelles du client.
 */
export function Certification() {
  return (
    <section className="section-y">
      <div className="container-site">
        <div className="relative grid items-stretch overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#3D4F5D_0%,#2C3A45_100%)] text-white lg:grid-cols-2">
          <div className="p-[clamp(32px,4vw,64px)]">
            <span className="caps caps-on-dark mb-3.5">Reconnaissance</span>
            <h2 className="mb-5 font-display text-[clamp(24px,3vw,36px)] leading-[1.15] font-bold text-white">
              Un artisan certifié{" "}
              <span className="accent-on-dark">RGE QualiPV</span>
            </h2>
            <p className="mb-4 text-[15px] leading-[1.65] text-white/88">
              La qualification RGE QualiPV est délivrée après audit de nos
              chantiers et formation continue de nos équipes. C&apos;est elle
              qui conditionne votre accès aux aides de l&apos;État et à
              l&apos;obligation d&apos;achat du surplus par EDF OA.
            </p>
            <p className="mb-7 text-[15px] leading-[1.65] text-white/88">
              Chaque installation est posée par nos équipes salariées, couverte
              par une assurance décennale et suivie par un interlocuteur unique,
              de l&apos;étude jusqu&apos;à la mise en service.
            </p>
            <Link href={siteConfig.cta.href} className="btn btn-primary btn-lg">
              Demander un devis
            </Link>
          </div>

          <div className="relative min-h-[320px] overflow-hidden">
            <Image
              src="/solar-house-hero.jpg"
              alt={`Installation photovoltaïque réalisée par ${siteConfig.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
