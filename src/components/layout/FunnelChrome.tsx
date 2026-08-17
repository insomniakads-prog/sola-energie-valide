import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Wordmark } from "@/components/ui/Wordmark";

/**
 * Header allégé du parcours d'estimation : pas de navigation, une seule
 * sortie. Tout lien supplémentaire fait fuir du formulaire.
 */
export function FunnelHeader() {
  return (
    <header className="border-b border-ink/8 bg-white">
      <div className="container-site flex h-20 items-center justify-between gap-4 md:h-[104px]">
        <Link href="/" className="shrink-0">
          <Wordmark />
        </Link>
        <Link href="/" className="btn btn-outline btn-sm">
          <ArrowLeft className="size-3.5" strokeWidth={2.4} />
          <span className="hidden sm:inline">
            Revenir à la page d&apos;accueil
          </span>
          <span className="sm:hidden">Accueil</span>
        </Link>
      </div>
    </header>
  );
}

