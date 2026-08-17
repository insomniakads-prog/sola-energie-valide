import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { regions } from "@/lib/regions";
import { Wordmark } from "@/components/ui/Wordmark";

export function SiteFooter() {
  return (
    <footer className="bg-white py-12">
      <div className="container-site">
        <Wordmark size="lg" />
        <div className="my-8 h-px bg-ink/10" />

        <div className="mb-8">
          <p className="mb-3 text-[12px] font-semibold tracking-[0.06em] text-ink/50 uppercase">
            Nos zones d&apos;intervention
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink/60">
            <Link href="/" className="transition-colors hover:text-ink">
              Île-de-France
            </Link>
            {regions.map((region) => (
              <Link
                key={region.slug}
                href={`/${region.slug}`}
                className="transition-colors hover:text-ink"
              >
                {region.zone}
              </Link>
            ))}
          </nav>
        </div>

        <div className="my-8 h-px bg-ink/10" />
        <div className="flex flex-col items-start justify-between gap-4 text-[13px] text-ink/60 sm:flex-row sm:items-center">
          <p>
            {siteConfig.name} — {new Date().getFullYear()}
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/politique-de-confidentialite"
              className="transition-colors hover:text-ink"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/mentions-legales"
              className="transition-colors hover:text-ink"
            >
              Mentions légales
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
