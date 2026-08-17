import Image from "next/image";
import Link from "next/link";
import { Home, KeyRound } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { heroPoints, ratings } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ice pt-[clamp(48px,8vw,104px)] pb-[clamp(48px,7vw,88px)]">
      <div className="container-site">
        <div className="grid items-center gap-[clamp(32px,4vw,64px)] lg:grid-cols-[1.15fr_1fr]">
          <div>
            <h1 className="mb-[22px] font-display text-[clamp(30px,3.8vw,46px)] leading-[1.08] font-extrabold text-ink">
              Votre installateur de panneaux solaires{" "}
              <span className="whitespace-nowrap">en {siteConfig.zone}</span>
            </h1>

            <ul className="mb-[26px] flex flex-col gap-2.5">
              {heroPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-[14.5px] font-medium text-ink"
                >
                  <span
                    aria-hidden
                    className="size-2.5 shrink-0 rounded-full bg-sun shadow-[0_0_0_4px_rgba(241,189,50,.28)]"
                  />
                  {point}
                </li>
              ))}
            </ul>

            <p className="mb-5 max-w-[520px] text-[14.5px] leading-[1.55] text-ink/70">
              Obtenez une estimation fiable de vos économies (gratuitement et
              sans engagement) en cliquant ci-dessous :
            </p>

            <div className="mb-6 flex flex-wrap gap-3.5">
              <EstimationCta
                href={siteConfig.ctaProprietaire}
                icon={<Home className="size-5" strokeWidth={2.2} />}
                label="Propriétaire"
              />
              <EstimationCta
                href={siteConfig.ctaLocataire}
                icon={<KeyRound className="size-5" strokeWidth={2.2} />}
                label="Locataire"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6">
              {ratings.map((rating, i) => (
                <div key={rating.label} className="flex items-center gap-6">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="hidden h-8 w-px bg-ink/15 sm:block"
                    />
                  )}
                  <div className="flex flex-col gap-0.5">
                    <span
                      aria-hidden
                      className="text-sm tracking-[1px] text-sun"
                    >
                      ★★★★★
                    </span>
                    <span className="text-[12.5px] text-ink/70">
                      <strong className="font-bold text-ink">
                        {rating.score}
                      </strong>{" "}
                      {rating.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square overflow-hidden rounded-[32px] bg-white shadow-float">
            <Image
              src="/solar-installer-hero.jpg"
              alt={`Techniciens ${siteConfig.name} réalisant une installation photovoltaïque`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function EstimationCta({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex min-w-0 flex-1 basis-[220px] items-center gap-3.5 rounded-[20px] border-2 border-ink/10 bg-white px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-sun hover:bg-sun/10 hover:shadow-[0_12px_28px_rgba(61,79,93,.14)]"
    >
      {/* icône ardoise sur pastille jaune : le blanc sur ce jaune tombe à 1,74:1 */}
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sun text-ink">
        {icon}
      </span>
      <span className="flex flex-col gap-0.5 leading-[1.25]">
        <small className="text-xs font-medium tracking-[0.05em] text-ink/60 uppercase">
          Je suis
        </small>
        <strong className="text-[15.5px] font-extrabold text-ink">
          {label}
        </strong>
      </span>
    </Link>
  );
}
