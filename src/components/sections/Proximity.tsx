import Image from "next/image";
import { siteConfig } from "@/lib/constants";
import { chantiers } from "@/lib/content";

export function Proximity() {
  return (
    <section id="realisations" className="section-y bg-paper">
      <div className="container-site">
        {/* Texte + carte */}
        <div className="mb-[clamp(48px,6vw,88px)] grid items-center gap-[clamp(32px,4vw,64px)] lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="caps mb-3.5">Artisan local</span>
            <h2 className="mb-[18px] font-display text-[clamp(28px,3.8vw,46px)] leading-[1.1] font-extrabold text-ink">
              Nous sommes un <span className="accent">artisan de proximité</span>
            </h2>
            <p className="max-w-[460px] text-[15px] leading-[1.6] text-ink/70">
              {/* ⚠️ À VALIDER : nombre réel d'installations */}
              Des centaines d&apos;installations réalisées en {siteConfig.zone}{" "}
              et départements limitrophes.
            </p>
          </div>

          <div className="relative aspect-[5/4] max-h-[520px] overflow-hidden rounded-[32px] border border-ink/10 bg-ice shadow-float">
            {/* ⚠️ À VALIDER : remplacer par la carte Google My Maps du client */}
            <iframe
              src="https://www.google.com/maps?q=%C3%8Ele-de-France,+France&z=8&output=embed"
              title={`Carte des installations ${siteConfig.name} en ${siteConfig.zone}`}
              loading="lazy"
              allowFullScreen
              className="size-full border-0"
            />
          </div>
        </div>

        {/* Chantiers récents */}
        <div className="mb-[clamp(24px,3vw,40px)] text-center">
          <h3 className="font-display text-[clamp(20px,2.2vw,26px)] leading-[1.2] font-bold text-ink">
            Quelques chantiers{" "}
            <span className="accent">récemment réalisés</span>
          </h3>
        </div>

        <div className="scroll-row -mx-[var(--gutter)] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
          {chantiers.map((chantier) => (
            <article
              key={chantier.ville}
              className="group flex shrink-0 basis-[72%] snap-start flex-col overflow-hidden rounded-[20px] border border-ice bg-white transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-lg md:basis-auto"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ice">
                <Image
                  src={chantier.image}
                  alt={`Installation photovoltaïque sur toiture ${chantier.toiture.toLowerCase()} à ${chantier.ville} (${chantier.departement})`}
                  fill
                  sizes="(max-width: 768px) 72vw, (max-width: 1024px) 45vw, 23vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2.5 p-[22px]">
                <span className="text-[11px] font-semibold tracking-[0.12em] text-gold uppercase">
                  {chantier.ville}
                </span>
                <h4 className="font-display text-[18px] leading-[1.2] font-bold text-ink">
                  {chantier.puissance}
                </h4>
                <div className="mt-auto flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full bg-ice px-3 py-1 text-[11.5px] font-semibold text-ink">
                    {chantier.departement}
                  </span>
                  <span className="inline-flex rounded-full bg-sun/15 px-3 py-1 text-[11.5px] font-semibold text-gold">
                    {chantier.toiture}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-3 px-5 text-center text-xs italic text-ink/50 md:hidden">
          Glissez pour voir toutes les installations →
        </p>
      </div>
    </section>
  );
}
