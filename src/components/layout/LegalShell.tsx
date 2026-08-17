import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Gabarit commun aux pages légales : bandeau ice + colonne de lecture.
 */
export function LegalShell({
  eyebrow,
  title,
  updatedAt,
  children,
}: {
  eyebrow: string;
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-ice pt-[clamp(40px,6vw,72px)] pb-[clamp(32px,5vw,56px)]">
        <div className="relative mx-auto w-full max-w-[820px] px-[var(--gutter)]">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-[13px] font-medium text-ink/60 transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5" strokeWidth={2.4} />
            Retour à l&apos;accueil
          </Link>
          <span className="caps mb-3 block">{eyebrow}</span>
          <h1 className="font-display text-[clamp(28px,3.4vw,42px)] leading-[1.1] font-extrabold text-ink">
            {title}
          </h1>
          <p className="mt-4 text-[13px] text-ink/60">
            Dernière mise à jour : {updatedAt}
          </p>
        </div>
      </section>

      <section className="py-[clamp(40px,5vw,72px)]">
        <div className="legal-prose mx-auto w-full max-w-[820px] px-[var(--gutter)]">
          {children}
        </div>
      </section>
    </>
  );
}
