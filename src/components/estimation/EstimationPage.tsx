import { EstimationForm } from "@/components/estimation/EstimationForm";
import { TrustColumn } from "@/components/estimation/TrustColumn";
import type { Profil } from "@/lib/estimation";

export function EstimationPage({
  profil,
  eyebrow,
}: {
  profil: Profil;
  eyebrow: string;
}) {
  return (
    <section className="py-[clamp(32px,5vw,64px)]">
      <div className="container-site">
        <div className="mb-8 max-w-[640px]">
          <span className="caps mb-3">{eyebrow}</span>
          <h1 className="font-display text-[clamp(26px,3.4vw,40px)] leading-[1.1] font-extrabold text-ink">
            Découvrez votre <span className="accent">potentiel solaire</span>
          </h1>
          <p className="mt-3 text-[15px] leading-[1.6] text-ink/70">
            Obtenez votre estimation de puissance en moins de 2 minutes.
            Gratuit, sans engagement.
          </p>
        </div>

        {/* Le formulaire de référence est encadré à 500px : au-delà, les
            options s'étirent et le parcours perd sa lisibilité. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,500px)_minmax(0,380px)] lg:gap-14">
          <EstimationForm profil={profil} />
          <TrustColumn />
        </div>
      </div>
    </section>
  );
}
