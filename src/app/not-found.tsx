import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

// La page 404 vit hors des groupes de routes : elle porte son propre habillage.
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-ice px-4 py-20 text-center">
        <p className="caps mb-4">Erreur 404</p>
        <h1 className="font-display text-[clamp(48px,8vw,88px)] leading-none font-extrabold">
          <span className="accent">404</span>
        </h1>
        <p className="mt-6 font-display text-xl font-bold text-ink">
          Page introuvable
        </p>
        <p className="mt-2 text-[14.5px] text-ink/70">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link href="/" className="btn btn-primary btn-lg mt-8">
          Retour à l&apos;accueil
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
