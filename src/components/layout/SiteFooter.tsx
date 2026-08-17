import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { Wordmark } from "@/components/ui/Wordmark";

export function SiteFooter() {
  return (
    <footer className="bg-white py-12">
      <div className="container-site">
        <Wordmark size="lg" />
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
