import { Check } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { ratings } from "@/lib/content";

/* ⚠️ À VALIDER — mêmes placeholders que la page d'accueil. */
const kpis = [
  { valeur: "RGE", label: "installateur certifié QualiPV" },
  { valeur: "+500", label: "installations réalisées" },
  { valeur: "30 ans", label: "de garantie produits" },
  { valeur: "0", label: "sous-traitance" },
];

const garanties = [
  "Réponse sous 48 h",
  "Gratuit et sans engagement",
  "Aucun démarchage téléphonique abusif",
];

export function TrustColumn() {
  return (
    <aside className="flex flex-col gap-6">
      <div>
        <span className="caps mb-3">{siteConfig.name}</span>
        <h2 className="font-display text-[clamp(20px,2.2vw,26px)] leading-[1.2] font-bold text-ink">
          Votre partenaire de confiance
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-2xl border border-ice bg-white p-4"
          >
            <p className="font-display text-[20px] leading-none font-extrabold">
              <span className="accent">{kpi.valeur}</span>
            </p>
            <p className="mt-2 text-[12.5px] leading-[1.4] text-ink/70">
              {kpi.label}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-ice bg-white p-5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {ratings.map((rating) => (
            <div key={rating.label} className="flex flex-col gap-0.5">
              <span aria-hidden className="text-sm tracking-[1px] text-sun">
                ★★★★★
              </span>
              <span className="text-[12.5px] text-ink/70">
                <strong className="font-bold text-ink">{rating.score}</strong>{" "}
                {rating.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ul className="flex flex-col gap-2.5">
        {garanties.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-[13.5px] text-ink/75">
            <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-sun/20 text-ink">
              <Check className="size-3" strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
