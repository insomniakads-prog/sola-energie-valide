import Link from "next/link";
import { Check } from "lucide-react";
import { siteConfig } from "@/lib/constants";

const reassurance = ["Réponse sous 48 h", "Gratuitement", "Sans engagement"];

export function FinalCta() {
  return (
    <section className="section-y bg-ink text-white">
      <div className="mx-auto w-full max-w-[760px] px-[var(--gutter)] text-center">
        <span className="caps caps-on-dark mb-3.5">
          Rejoignez vos voisins équipés
        </span>
        <h2 className="t-display mb-4 text-white">
          Prêt à produire{" "}
          <span className="accent-on-dark">votre propre électricité ?</span>
        </h2>
        <p className="mx-auto mb-8 max-w-[560px] text-[15px] leading-[1.6] text-white/85">
          Étude personnalisée réalisée par nos experts {siteConfig.name}.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href={siteConfig.cta.href} className="btn btn-primary btn-lg">
            Demander mon étude gratuite
          </Link>
          <a
            href={siteConfig.phoneHref}
            className="btn btn-outline-white btn-lg"
          >
            {siteConfig.phone}
          </a>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-6 text-[13px] text-white/80">
          {reassurance.map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <span className="inline-flex size-[18px] shrink-0 items-center justify-center rounded-full bg-white/18">
                <Check className="size-2.5" strokeWidth={3.5} />
              </span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
