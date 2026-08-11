/**
 * LandingFooter — Footer générique pour landing pages
 * -----------------------------------------------------
 * Logo centré + texte légal + liens mentions / confidentialité
 *
 * USAGE :
 *   <LandingFooter
 *     logoSrc="/images/mon-logo.png"
 *     logoAlt="Mon Entreprise"
 *     legalText="Ce site a pour vocation de vous mettre en relation avec des professionnels."
 *     siteName="MonSite.fr"
 *   />
 */

import Image from "next/image";
import Link from "next/link";

interface LandingFooterProps {
  logoSrc: string;
  logoAlt?: string;
  /** Texte légal affiché sous le logo */
  legalText?: string;
  /** Nom du site pour le copyright */
  siteName?: string;
  /** Lien mentions légales (défaut: /mentions-legales) */
  mentionsHref?: string;
  /** Lien politique de confidentialité (défaut: /politique-confidentialite) */
  confidentialiteHref?: string;
  /** Liens additionnels optionnels */
  extraLinks?: { label: string; href: string }[];
}

export function LandingFooter({
  logoSrc,
  logoAlt = "Logo",
  legalText,
  siteName,
  mentionsHref = "/mentions-legales",
  confidentialiteHref = "/politique-confidentialite",
  extraLinks = [],
}: LandingFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={240}
            height={120}
            className="h-20 w-auto mb-4"
          />

          {legalText && (
            <p className="text-xs md:text-sm text-muted-foreground mb-4 max-w-2xl leading-relaxed">
              {legalText}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-4 text-sm mb-4">
            <Link
              href={mentionsHref}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href={confidentialiteHref}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Politique de confidentialité
            </Link>
            {extraLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            © {year}{siteName ? ` ${siteName}` : ""}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
